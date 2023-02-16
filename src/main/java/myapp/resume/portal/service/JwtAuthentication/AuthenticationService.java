package myapp.resume.portal.service.JwtAuthentication;

import lombok.RequiredArgsConstructor;
import myapp.resume.portal.model.JwtAuthentication.AuthenticationRequest;
import myapp.resume.portal.model.JwtAuthentication.AuthenticationResponse;
import myapp.resume.portal.model.JwtAuthentication.RegisterRequest;
import myapp.resume.portal.model.user.*;
import myapp.resume.portal.repository.UserProfileRepository;
import myapp.resume.portal.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final UserProfileRepository userProfileRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        String uniqueUserId = passwordEncoder.encode(request.getEmail());
        String uniqueUserIdFormatted = uniqueUserId.replaceAll("[^A-Za-z0-9]","");
        var user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .uniqueUserId(uniqueUserIdFormatted)
                .build();
        userRepository.save(user);
        var userProfile = UserProfile.builder()
                .email(request.getEmail())
                .uniqueUserId(uniqueUserIdFormatted)
                .theme(1)
                .skills(Skill.builder()
                        .languages(List.of("English"))
                        .technologys(List.of("Java"))
                        .build())
                .build();
        userProfileRepository.save(userProfile);
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
