package homeBudget.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import homeBudget.model.IncomeDetails;

public interface IncomeDetailsRepository extends JpaRepository<IncomeDetails, Long>{

}
