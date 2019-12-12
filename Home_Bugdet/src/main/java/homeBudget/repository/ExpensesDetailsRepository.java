package homeBudget.repository;

import homeBudget.model.IncomeDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import homeBudget.model.ExpensesDetails;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExpensesDetailsRepository extends JpaRepository<ExpensesDetails, Long>{

    List<ExpensesDetails> getAllByExpensesBasicNamesId (Long id);

    @Query(value = "SELECT SUM(expenses_details.money) as money FROM home_budget.expenses_details expenses_details " +
            "WHERE CAST(expenses_details.date AS Date) < :date AND expenses_details.expenses_name_id in (:nameId)",
            nativeQuery = true)
    Long getSumMoneyByDateAndExpensesNameId (@Param("date") String date, @Param("nameId") List<Long> id);

    @Query(value = "SELECT SUM(ed.money) as money FROM home_budget.expenses_details ed " +
            "WHERE ed.expenses_name_id = :expensesNameId", nativeQuery = true)
    Long getDetailsMoneyByExpensesBasicNamesId(@Param("expensesNameId") Long id);
}
