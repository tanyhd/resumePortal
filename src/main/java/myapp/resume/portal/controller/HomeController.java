package myapp.resume.portal.controller;

import lombok.RequiredArgsConstructor;
import myapp.resume.portal.model.JwtAuthentication.AuthenticationRequest;
import myapp.resume.portal.model.user.*;
import myapp.resume.portal.repository.UserProfileRepository;
import myapp.resume.portal.repository.UserRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import java.util.Optional;

@Controller
@RequiredArgsConstructor
public class HomeController {

    private final UserProfileRepository userProfileRepository;
    private final UserRepository userRepository;

    @GetMapping("/home/login")
    public String homeLogin(Model model) {
        AuthenticationRequest authenticationRequest = AuthenticationRequest.builder().build();
        model.addAttribute("authenticationRequest", authenticationRequest);
        return "login";
    }

    @GetMapping("/home/login-error")
    public String loginError() {
        return "login-error";
    }

    @GetMapping("/home/register")
    public String register() {
        return "register";
    }

    @GetMapping("/home/edit")
    public String homeEdit() {
        return "profile-edit";
    }

    @GetMapping("/view/{userId}")
    public String view(@PathVariable String userId, Model model) {

        Optional<UserProfile> userProfileOptional = userProfileRepository.findByUniqueUserId(userId);
        userProfileOptional.orElseThrow(() -> new RuntimeException("User not found"));

        model.addAttribute("userId", userId);

        UserProfile userProfile = userProfileOptional.get();
        model.addAttribute("userProfile", userProfile);

        return "profile-templates/" + userProfile.getTheme() + "/index";
    }
}
