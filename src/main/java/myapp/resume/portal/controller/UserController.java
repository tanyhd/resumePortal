package myapp.resume.portal.controller;

import lombok.RequiredArgsConstructor;
import myapp.resume.portal.model.user.UserProfile;
import myapp.resume.portal.repository.UserProfileRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserProfileRepository userProfileRepository;

    @GetMapping("/user/edit")
    public UserProfile homeEdit(@RequestParam String email) {
        Optional<UserProfile> userProfileOptional = userProfileRepository.findByEmail(email);
        userProfileOptional.orElseThrow(() -> new RuntimeException("User not found"));
        return userProfileOptional.get();
    }
}
