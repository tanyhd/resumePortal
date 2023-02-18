package myapp.resume.portal.service.userProfile;

import myapp.resume.portal.model.user.*;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class UserProfileService {

    public UserProfile getSampleUserProfile(String userId, String email) {
        return UserProfile.builder()
                .email(email)
                .phoneNumber("+65 111111111")
                .summary("Example: Junior Software Engineer experienced in software development, testing, and maintenance. Proficient in Java, Python, and C++. Knowledgeable in Agile methodologies and able to work in fast-paced teams. Strong analytical and problem-solving skills with a focus on delivering high-quality code. Seeking to use my technical skills to make a positive impact in a challenging software engineering role.")
                .theme(1)
                .firstName("John")
                .lastName("Doe")
                .designation("Software Engineer")
                .uniqueUserId(userId)
                .jobs(List.of(
                        Job.builder()
                                .company("Company Name")
                                .designation("Software Engineer")
                                .startDate(LocalDate.of(2021, 3, 1))
                                .endDate(LocalDate.of(2023, 5,1))
                                .isCurrentJob(true)
                                .responsibilities(List.of(
                                        "Participating in the software development lifecycle, including requirements gathering, design, development, testing, and maintenance",
                                        "Writing, testing, and maintaining high-quality, efficient, and reusable code. Debugging and fixing software defects"
                                ))
                                .build()
                ))
                .educations(List.of(
                        Education.builder()
                                .qualification("BSc. Honours Computer Science")
                                .university("Nanyang Technological University (NTU)")
                                .startDate(LocalDate.of(2008, 6, 1))
                                .endDate(LocalDate.of(2011, 7,1))
                                .build()
                ))
                .skills(
                        Skill.builder()
                                .languages(List.of(
                                        "Java",
                                        "C#",
                                        "Javascript",
                                        "Typescript",
                                        "SQL"
                                ))
                                .technologys(List.of(
                                        "Angular",
                                        "Spring Boot"
                                ))
                                .build()
                )
                .projects(List.of(
                        Project.builder()
                                .title("Image Repository")
                                .description("A full-stack image repository, where users can store their files. Created a GCP cloud function to implement CP-ABE encryption and used it to ensure files are secure at rest.")
                                .linkToProject("https://github.com")
                                .technologyUsed("Java, PHP, React, TypeScript, Maven, GCP, MySQL")
                                .build(),
                        Project.builder()
                                .title("Biometric Dynamic Keystroke Spoofer")
                                .description("A program that authenticates users based on their typing patterns. And a spoofer that uses the genetic algorithm to mimic the user's typing pattern.")
                                .linkToProject("https://github.com")
                                .technologyUsed("Java, SQL, Spring Boot")
                                .build()
                ))
                .build();
    }
}
