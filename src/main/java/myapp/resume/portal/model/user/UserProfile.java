package myapp.resume.portal.model.user;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private int theme;
    @Column(length = 512)
    private String summary;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String designation;
    @Column(unique = true)
    private String email;
    private String uniqueUserId;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "job_id")
    private List<Job> jobs;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "education_id")
    private List<Education> educations;
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "skill_id")
    private Skill skills;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "project_id")
    private List<Project> projects;


}
