package myapp.resume.portal.repository;

import myapp.resume.portal.model.user.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserProfileRepository extends JpaRepository<UserProfile, Integer> {

    Optional<UserProfile> findByUniqueUserId(String userId);
}
