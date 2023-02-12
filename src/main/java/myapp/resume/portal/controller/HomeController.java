package myapp.resume.portal.controller;

import lombok.RequiredArgsConstructor;
import myapp.resume.portal.model.JwtAuthentication.AuthenticationRequest;
import myapp.resume.portal.model.user.Education;
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
        Optional<User> userOptional = userRepository.findByEmail("darren243@hotmail.com");
        User user1 = userOptional.get();
        UserProfile userProfile1 = UserProfile.builder()
                .email("darren243@hotmail.com")
                .phoneNumber("+65 123456789")
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
                                .responsibilities(List.of(
                                        "Participating in the software development lifecycle, including requirements gathering, design, development, testing, and maintenance",
                                        "Writing, testing, and maintaining high-quality, efficient, and reusable code. Debugging and fixing software defects",
                                        "Collaborating with cross-functional teams to identify, prioritize, and deliver software solutions",
                                        "Implementing software design patterns, algorithms, and data structures",
                                        "Following best practices for software development and documentation",
                                        "Participating in code reviews and contributing to continuous improvement of the software development process",
                                        "Assisting in the planning and estimation of software development projects",
                                        "Providing technical support for software applications, as required"
                                ))
                                .build(),
                        Job.builder()
                                .company("STK")
                                .designation("Principle Engineer")
                                .startDate(LocalDate.of(2011, 7,1))
                                .endDate(LocalDate.of(2021, 12, 1))
                                .isCurrentJob(false)
                                .responsibilities(List.of(
                                        "Designing, developing, and testing mechanical systems, components, and products",
                                        "Analyzing and resolving mechanical design problems, using computer-aided design tools and mathematical models",
                                        "Creating and maintaining detailed design documentation, including specifications, drawings, and schematics",
                                        "Collaborating with cross-functional teams, including manufacturing, quality, and suppliers, to ensure product designs meet requirements",
                                        "Participating in the design review process, including presentations, evaluations, and risk assessments",
                                        "Providing technical support for the manufacturing, assembly, and testing of mechanical products",
                                        "Conducting feasibility studies, cost estimates, and trade studies for new product designs",
                                        "Participating in the continuous improvement of mechanical design processes and standards",
                                        "Supporting the development of product test plans, including design, execution, and analysis",
                                        "Conducting failure analysis, root cause investigations, and risk assessments."
                                ))
                                .build()
                ))
                .educations(List.of(
                        Education.builder()
                                .qualification("BSc. Honours Computer Science With Software Engineering Specialization")
                                .university("Nanyang Technological University (NTU)")
                                .startDate(LocalDate.of(2008, 6, 1))
                                .endDate(LocalDate.of(2011, 7,1))
                                .build()
                ))
                .build();
        userProfileRepository.save(userProfile1);

        Optional<User> userOptional2 = userRepository.findByEmail("elena89@gmail.com");
        User user2 = userOptional2.get();

        UserProfile userProfile2 = UserProfile.builder()
                .email("elena89@gmail.com")
                .phoneNumber("+1 (555) 555-5555")
                .summary("Experienced software developer with a strong background in developing high-quality software solutions using Java and Python. Proficient in Agile methodologies and familiar with various software development tools and technologies. Strong problem-solving skills, attention to detail, and the ability to work in a fast-paced environment. Seeking a challenging software development role where I can utilize my technical and interpersonal skills to deliver innovative solutions.")
                .theme(2)
                .firstName("Elena")
                .lastName("Rodriguez")
                .designation("Software Developer")
                .uniqueUserId(user2.getUniqueUserId())
                .jobs(List.of(
                        Job.builder()
                                .company("Google")
                                .designation("Software Engineer")
                                .startDate(LocalDate.of(2019, 9, 1))
                                .endDate(LocalDate.of(2022, 12, 31))
                                .isCurrentJob(false)
                                .responsibilities(List.of(
                                        "Developing high-quality software solutions using Java and Python",
                                        "Participating in the software development lifecycle, including requirements gathering, design, development, testing, and maintenance",
                                        "Debugging and fixing software defects",
                                        "Collaborating with cross-functional teams to deliver software solutions",
                                        "Implementing software design patterns and algorithms",
                                        "Maintaining software documentation and following best practices for software development",
                                        "Providing technical support for software applications, as required"
                                ))
                                .build(),
                        Job.builder()
                                .company("Microsoft")
                                .designation("Software Developer")
                                .startDate(LocalDate.of(2017, 5, 1))
                                .endDate(LocalDate.of(2019, 9, 1))
                                .isCurrentJob(false)
                                .responsibilities(List.of(
                                        "Developing software solutions using Java and Python",
                                        "Participating in the software development lifecycle, including requirements gathering, design, development, testing, and maintenance",
                                        "Debugging and fixing software defects",
                                        "Collaborating with cross-functional teams to deliver software solutions",
                                        "Implementing software design patterns and algorithms",
                                        "Maintaining software documentation and following best practices for software development",
                                        "Providing technical support for software applications, as required"
                                ))
                                .build()
                ))
                .educations(List.of(
                        Education.builder()
                                .qualification("BS in Computer Science")
                                .university("Stanford University")
                                .startDate(LocalDate.of(2013, 9, 1))
                                .endDate(LocalDate.of(2017, 5, 1))
                                .build()
                ))
                .build();
        userProfileRepository.save(userProfile2);

        Optional<User> userOptional3 = userRepository.findByEmail("tiffanyjones@gmail.com");
        User user3 = userOptional3.get();

        UserProfile userProfile3 = UserProfile.builder()
                .email("tiffanyjones@gmail.com")
                .phoneNumber("+1 (415) 555-5555")
                .summary("Experienced product manager with a background in software development. Proficient in project management, Agile methodologies, and data analysis. Strong communication and interpersonal skills, able to effectively manage cross-functional teams and drive product development from ideation to launch. Seeking to leverage my technical and leadership skills in a challenging product management role.")
                .theme(2)
                .firstName("Tiffany")
                .lastName("Jones")
                .designation("Product Manager")
                .uniqueUserId(user3.getUniqueUserId())
                .jobs(List.of(
                        Job.builder()
                                .company("Google")
                                .designation("Product Manager")
                                .startDate(LocalDate.of(2019, 4, 1))
                                .endDate(LocalDate.of(2023, 2, 1))
                                .isCurrentJob(true)
                                .responsibilities(List.of(
                                        "Defining and communicating the product vision and strategy to cross-functional teams",
                                        "Managing the entire product development life cycle, from ideation to launch",
                                        "Collecting and analyzing data to inform product decisions and make data-driven recommendations",
                                        "Working with designers, engineers, and stakeholders to develop and launch new products",
                                        "Driving product development from concept to launch, including defining and prioritizing features, creating product specifications, and conducting user research and testing",
                                        "Collaborating with cross-functional teams, including engineering, design, marketing, and customer support, to drive product development and launch",
                                        "Managing the product backlog and ensuring the team is aligned on priorities and goals",
                                        "Communicating product plans, benefits, and results to stakeholders, including senior leadership and customers"
                                ))
                                .build(),
                        Job.builder()
                                .company("Amazon")
                                .designation("Senior Product Manager")
                                .startDate(LocalDate.of(2015, 7, 1))
                                .endDate(LocalDate.of(2019, 4, 1))
                                .isCurrentJob(false)
                                .responsibilities(List.of(
                                        "Developed and executed the product strategy for Amazon's e-commerce platform",
                                        "Managed a cross-functional team of designers, engineers, and data scientists to launch new products and features",
                                        "Conducted market and competitive research to inform product decisions",
                                        "Analyzed data to optimize product performance and drive customer engagement",
                                        "Managed the product roadmap, backlog, and budget, and communicated plans to stakeholders",
                                        "Partnered with marketing and customer support teams to drive product adoption and customer satisfaction",
                                        "Conducted user research and testing to validate product concepts and inform design decisions",
                                        "Contributed to the development of company-wide product management processes and best practices"
                                ))
                                .build()
                ))
                .educations(List.of(
                        Education.builder()
                                .qualification("Bachelor of Science in Computer Science")
                                .university("University of California, Berkeley")
                                .startDate(LocalDate.of(2011, 9, 1))
                                .endDate(LocalDate.of(2013, 7, 9))
                                .build()
                ))
                .build();

        userProfileRepository.save(userProfile3);
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
