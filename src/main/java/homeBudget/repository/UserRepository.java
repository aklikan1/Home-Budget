package homeBudget.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import homeBudget.model.User;

public interface UserRepository extends JpaRepository <User, Long>{

}
