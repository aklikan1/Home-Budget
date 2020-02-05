package homeBudget.repository;

import homeBudget.model.User;
import homeBudget.model.UserPhoto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserPhotoRepository extends JpaRepository<UserPhoto, Long> {
    Boolean existsByUser(User user);
}
