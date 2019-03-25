package homeBudget.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import homeBudget.model.BudgetExpenses;

public interface BudgetExpensesRepository extends JpaRepository<BudgetExpenses, Long>{

}
