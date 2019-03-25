package homeBudget.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import homeBudget.model.ExpensesDetails;

public interface ExpensesDetailsRepository extends JpaRepository<ExpensesDetails, Long>{

}
