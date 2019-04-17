package homeBudget.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import homeBudget.model.User;

import java.util.Optional;


public interface UserRepository extends JpaRepository <User, Long>{

    User findUserByUsername(String username);
}
