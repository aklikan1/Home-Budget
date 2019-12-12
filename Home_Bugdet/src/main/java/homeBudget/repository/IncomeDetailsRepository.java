package homeBudget.repository;

import homeBudget.controller.viewModel.BudgetBaseNameAndDetailsMoney;
import org.springframework.data.jpa.repository.JpaRepository;

import homeBudget.model.IncomeDetails;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Calendar;
import java.util.List;

@Repository
public interface IncomeDetailsRepository extends JpaRepository<IncomeDetails, Long>{

    List<IncomeDetails> getAllByIncomeBasicNamesId (Long id);

    @Query(value = "SELECT SUM(incomeDetails.money) as money FROM home_budget.income_details incomeDetails " +
            "WHERE CAST(incomeDetails.date AS Date) < :date AND incomeDetails.income_name_id in (:nameId)",
            nativeQuery = true)
    Long getSumMoneyByDateAndIncomeNameId (@Param("date") String date, @Param("nameId") List<Long> id);

    @Query(value = "SELECT SUM(ids.money) as money FROM home_budget.income_details ids " +
            "WHERE ids.income_name_id = :incomeNameId", nativeQuery = true)
    Long getDetailsMoneyByIncomeBasicNamesId(@Param("incomeNameId") Long id);

}
