package myapp.resume.portal.controller;

import lombok.RequiredArgsConstructor;
import myapp.resume.portal.model.user.UserProfile;
import myapp.resume.portal.repository.UserProfileRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Objects;
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

        updatedUserProfile.getJobs().forEach(
                job -> {
                    if (job.getEndDate().equals(LocalDate.now())) {
                        job.setCurrentJob(true);
                    }
                }
        );

        // Save the updatedUserProfile object to your data store
        // Update existingUserProfile with values from updatedUserProfile
        existingUserProfile.setTheme(updatedUserProfile.getTheme());
        existingUserProfile.setSummary(updatedUserProfile.getSummary());
        existingUserProfile.setFirstName(updatedUserProfile.getFirstName());
        existingUserProfile.setLastName(updatedUserProfile.getLastName());
        existingUserProfile.setPhoneNumber(updatedUserProfile.getPhoneNumber());
        existingUserProfile.setDesignation(updatedUserProfile.getDesignation());
        existingUserProfile.setLinkedIn(updatedUserProfile.getLinkedIn());
        existingUserProfile.setGitHub(updatedUserProfile.getGitHub());
        existingUserProfile.setJobs(updatedUserProfile.getJobs());
        existingUserProfile.setEducations(updatedUserProfile.getEducations());
        existingUserProfile.setProjects(updatedUserProfile.getProjects());

        return userProfileRepository.save(existingUserProfile);
    }
}
