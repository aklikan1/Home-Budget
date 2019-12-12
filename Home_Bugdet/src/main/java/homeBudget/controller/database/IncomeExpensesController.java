package homeBudget.controller.database;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/incomeAndExpenses")
@CrossOrigin(origins = "http://localhost:4200")
public class IncomeExpensesController {

    private IncomeDetailsController incomeDetailsController;
    private ExpensesDetailsController expensesDetailsController;

    @Autowired
    public IncomeExpensesController(IncomeDetailsController incomeDetailsController, ExpensesDetailsController expensesDetailsController) {
        this.incomeDetailsController = incomeDetailsController;
        this.expensesDetailsController = expensesDetailsController;
    }

    @GetMapping(path = "/performance/budget/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<List<Long>>> getPerformanceIncomeAndExpensesMoneyInTimeByBudgetId (@PathVariable Long id) {
        List<List<Long>> incomeMoneyInTime = incomeDetailsController.incomeMoneyInTimeByBudgetId(id);
        List<List<Long>> expensesMoneyInTime = expensesDetailsController.getExpensesMoneyInTimeByBudgetId(id);
        List<List<Long>> performanceMoney = new ArrayList<>();

        for (int i=0; i<incomeMoneyInTime.size(); i++) {
            List<Long> tempMoneyList = new ArrayList<>();
            for (int j=0; j<incomeMoneyInTime.get(i).size(); j++) {
                Long differencesMoney = incomeMoneyInTime.get(i).get(j) - expensesMoneyInTime.get(i).get(j);
                tempMoneyList.add(differencesMoney);
            }
            performanceMoney.add(tempMoneyList);
        }

        return ResponseEntity.ok(performanceMoney);
    }


}
