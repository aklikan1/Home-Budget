package homeBudget.repository;

import homeBudget.model.IncomeBasicNames;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IncomeBasicNamesRepository extends JpaRepository<IncomeBasicNames, Long>{

    List<IncomeBasicNames> findAllByOrderById();
    List<IncomeBasicNames> getAllByBudgetIdOrderById(long budgetId);

    @Query(value = "SELECT ibn.income_name_id FROM home_budget.income_basic_names ibn WHERE ibn.budget_id = :id " +
            "ORDER BY ibn.income_name_id",
            nativeQuery = true)
    List<Long> getIncomeBasicNamesIdByBudgetId (@Param("id") long budgetId);
}
