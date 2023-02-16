package myapp.resume.portal.controller;

import lombok.RequiredArgsConstructor;
import myapp.resume.portal.model.user.UserProfile;
import myapp.resume.portal.repository.UserProfileRepository;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserProfileRepository userProfileRepository;

    @GetMapping("/user/edit")
    public UserProfile edit(@RequestParam String email) {
        Optional<UserProfile> userProfileOptional = userProfileRepository.findByEmail(email);
        userProfileOptional.orElseThrow(() -> new RuntimeException("User not found"));
        return userProfileOptional.get();
    }

    @PostMapping("/user/edit")
    public UserProfile postEdit(@RequestBody UserProfile updatedUserProfile) {
        UserProfile existingUserProfile = userProfileRepository.findByEmail(updatedUserProfile.getEmail()).get();

        // Save the updatedUserProfile object to your data store
        // Update existingUserProfile with values from updatedUserProfile
        existingUserProfile.setTheme(updatedUserProfile.getTheme());
        existingUserProfile.setSummary(updatedUserProfile.getSummary());
        existingUserProfile.setFirstName(updatedUserProfile.getFirstName());
        existingUserProfile.setLastName(updatedUserProfile.getLastName());
        existingUserProfile.setPhoneNumber(updatedUserProfile.getPhoneNumber());
        existingUserProfile.setDesignation(updatedUserProfile.getDesignation());
        existingUserProfile.setJobs(updatedUserProfile.getJobs());

        return userProfileRepository.save(existingUserProfile);
    }
}
