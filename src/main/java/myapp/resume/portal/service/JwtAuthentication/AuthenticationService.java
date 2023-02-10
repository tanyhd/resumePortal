package myapp.resume.portal.service.JwtAuthentication;

import lombok.RequiredArgsConstructor;
import myapp.resume.portal.model.JwtAuthentication.AuthenticationRequest;
import myapp.resume.portal.model.JwtAuthentication.AuthenticationResponse;
import myapp.resume.portal.model.JwtAuthentication.RegisterRequest;
import myapp.resume.portal.model.user.Role;
import myapp.resume.portal.model.user.User;
import myapp.resume.portal.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        String uniqueUserId = passwordEncoder.encode(request.getFirstname() + request.getLastname() + request.getEmail());
        String uniqueUserIdFormatted = uniqueUserId.replaceAll("[^A-Za-z0-9]","");
        var user = User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .uniqueUserId(uniqueUserIdFormatted)
                .build();
        userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = userRepository.findByEmail((request.getEmail())).orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
