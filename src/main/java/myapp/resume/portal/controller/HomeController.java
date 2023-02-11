package myapp.resume.portal.controller;

import lombok.RequiredArgsConstructor;
import myapp.resume.portal.model.JwtAuthentication.AuthenticationRequest;
import myapp.resume.portal.model.user.Job;
import myapp.resume.portal.model.user.User;
import myapp.resume.portal.model.user.UserProfile;
import myapp.resume.portal.repository.UserProfileRepository;
import myapp.resume.portal.repository.UserRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.time.LocalDate;
import java.util.List;
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

    @GetMapping("/home/{userEmail}")
    public String home(@PathVariable String userEmail) {
        Optional<User> userOptional = userRepository.findByEmail(userEmail);
        User user1 = userOptional.get();
        UserProfile userProfile1 = UserProfile.builder()
                .email("darren243@hotmail.com")
                .phoneNumber("+65 96532160")
                .summary("Junior Software Engineer experienced in software development, testing, and maintenance. Proficient in Java, Python, and C++. Knowledgeable in Agile methodologies and able to work in fast-paced teams. Strong analytical and problem-solving skills with a focus on delivering high-quality code. Seeking to use my technical skills to make a positive impact in a challenging software engineering role.")
                .theme(1)
                .firstName("Darren")
                .lastName("Tan")
                .designation("Software Engineer")
                .uniqueUserId(user1.getUniqueUserId())
                .jobs(List.of(
                        Job.builder()
                                .company("DBS")
                                .designation("Software Engineer")
                                .startDate(LocalDate.of(2021, 3, 1))
                                .endDate(LocalDate.of(2023, 5,1))
                                .isCurrentJob(true)
                                .roleDescription("Role description goes here ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.")
                                .responsibilities(List.of(
                                        "Lorem ipsum dolor sit amet, consectetuer.",
                                        "Aenean commodo ligula eget dolor.",
                                        "Etiam ultricies nisi vel augue."
                                ))
                                .build(),
                        Job.builder()
                                .company("STK")
                                .designation("Principle Engineer")
                                .startDate(LocalDate.of(2011, 7,1))
                                .endDate(LocalDate.of(2021, 12, 1))
                                .isCurrentJob(false)
                                .roleDescription("Role description goes here ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.")
                                .responsibilities(List.of(
                                        "Lorem ipsum dolor sit amet, consectetuer.",
                                        "Aenean commodo ligula eget dolor.",
                                        "Etiam ultricies nisi vel augue."
                                ))
                                .build()
                ))
                .build();
        userProfileRepository.save(userProfile1);
        return "profile";
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
