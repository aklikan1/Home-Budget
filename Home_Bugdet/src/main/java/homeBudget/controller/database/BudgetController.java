package homeBudget.controller.database;

import homeBudget.model.Budget;
import homeBudget.repository.BudgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/budget")
@CrossOrigin(origins = "http://localhost:4200")
public class BudgetController {

    private BudgetRepository budgetRepository;

    @Autowired
    public BudgetController(BudgetRepository budgetRepository) {
        this.budgetRepository = budgetRepository;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Budget>> allBudgetDetails () {
        List<Budget> budget = budgetRepository.findAll();
        return ResponseEntity.ok(budget);
    }

    @GetMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Budget> getBudgetById(@PathVariable Long id) {
        Budget budget = budgetRepository.findById(id).get();
        return ResponseEntity.ok(budget);
    }

    @GetMapping(path = "/user/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Budget>> getAllBudgetsByUserId (@PathVariable Long id) {
        List<Budget> budgets = budgetRepository.getAllByUserId(id);
        return ResponseEntity.ok(budgets);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?>saveBudget(@RequestBody Budget budget) {
        Budget save = budgetRepository.save(budget);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("{id}")
                .buildAndExpand(save.getId())
                .toUri();
        return ResponseEntity.created(location).body(save);
    }

}
