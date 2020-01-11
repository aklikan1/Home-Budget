package homeBudget.controller.database;

import homeBudget.controller.viewModel.BudgetBaseNameAndDetailsMoney;
import homeBudget.model.ExpensesBasicNames;
import homeBudget.repository.ExpensesBasicNamesRepository;
import homeBudget.repository.ExpensesDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "http://localhost:4200")
public class ExpensesController {

    private ExpensesBasicNamesRepository namesRepository;
    private ExpensesDetailsRepository detailsRepository;

    @Autowired
    public ExpensesController(ExpensesBasicNamesRepository namesRepository, ExpensesDetailsRepository detailsRepository) {
        this.namesRepository = namesRepository;
        this.detailsRepository = detailsRepository;
    }

    @GetMapping(path = "namesMoney/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<BudgetBaseNameAndDetailsMoney>> getBudgetBaseNameAndDetailsMoneyByBudgetId (@PathVariable Long id) {
        List<BudgetBaseNameAndDetailsMoney> nameAndMoney = new ArrayList<>();

        List<ExpensesBasicNames> basicNames = namesRepository.getAllByBudgetIdOrderByIdAsc(id);
        basicNames.forEach(e -> {
            BudgetBaseNameAndDetailsMoney tempNamesMoney = new BudgetBaseNameAndDetailsMoney();
            tempNamesMoney.setName(e.getName());
            tempNamesMoney.setMoney(detailsRepository.getDetailsMoneyByExpensesBasicNamesId(e.getId()));
            nameAndMoney.add(tempNamesMoney);
        });

        return ResponseEntity.ok(nameAndMoney);
    }
}
