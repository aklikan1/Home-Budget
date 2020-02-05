package homeBudget.repository;

import homeBudget.model.UserCustomDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserCustomDetailsRepository extends JpaRepository <UserCustomDetails, Long> {
    UserCustomDetails getAllByUserId(Long id);
}
