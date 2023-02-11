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
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "job_id")
    private List<Job> jobs;


}