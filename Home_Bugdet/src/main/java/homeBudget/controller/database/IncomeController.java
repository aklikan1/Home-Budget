package homeBudget.controller.database;

import homeBudget.controller.viewModel.BudgetBaseNameAndDetailsMoney;
import homeBudget.model.IncomeBasicNames;
import homeBudget.repository.IncomeBasicNamesRepository;
import homeBudget.repository.IncomeDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/income")
@CrossOrigin(origins = "http://localhost:4200")
public class IncomeController {


    private IncomeBasicNamesRepository namesRepository;
    private IncomeDetailsRepository detailsRepository;

    @Autowired
    public IncomeController(IncomeBasicNamesRepository namesRepository, IncomeDetailsRepository detailsRepository) {
        this.namesRepository = namesRepository;
        this.detailsRepository = detailsRepository;
    }

    @GetMapping(path = "namesMoney/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<BudgetBaseNameAndDetailsMoney>> getBudgetBaseNameAndDetailsMoneyByBudgetId (@PathVariable Long id) {
        List<BudgetBaseNameAndDetailsMoney> nameAndMoney = new ArrayList<>();

        List<IncomeBasicNames> basicNames = namesRepository.getAllByBudgetIdOrderById(id);
        basicNames.forEach(e -> {
            BudgetBaseNameAndDetailsMoney tempNamesMoney = new BudgetBaseNameAndDetailsMoney();
            tempNamesMoney.setName(e.getName());
            tempNamesMoney.setMoney(detailsRepository.getDetailsMoneyByIncomeBasicNamesId(e.getId()));
            nameAndMoney.add(tempNamesMoney);
        });

        return ResponseEntity.ok(nameAndMoney);
    }
}

