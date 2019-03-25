package homeBudget.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import homeBudget.model.BudgetIncome;

public interface BudgetIncomeRepository extends JpaRepository<BudgetIncome, Long>{

}
