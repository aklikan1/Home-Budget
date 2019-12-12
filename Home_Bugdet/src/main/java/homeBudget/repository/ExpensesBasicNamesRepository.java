package homeBudget.repository;

import homeBudget.model.IncomeBasicNames;
import org.springframework.data.jpa.repository.JpaRepository;

import homeBudget.model.ExpensesBasicNames;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExpensesBasicNamesRepository extends JpaRepository<ExpensesBasicNames, Long>{

    List<ExpensesBasicNames> getAllByBudgetId (long budgetId);

    @Query(value = "SELECT ebn.expenses_name_id FROM home_budget.expenses_basic_names ebn WHERE ebn.budget_id = :id",
            nativeQuery = true)
    List<Long> getExpensesBasicNamesIdByBudgetId (@Param("id") long budgetId);
}
