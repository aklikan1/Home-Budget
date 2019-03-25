package homeBudget.controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import homeBudget.model.BudgetIncome;
import homeBudget.repository.BudgetIncomeRepository;

@RestController
@RequestMapping("/api/incomeBudget")
public class IncomeBudgetController {

	private BudgetIncomeRepository budgetIncomeRepository;
	
	@Autowired
	public IncomeBudgetController(BudgetIncomeRepository budgetIncomeRepository) {
		this.budgetIncomeRepository = budgetIncomeRepository;
	}
	
	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<BudgetIncome>> allIncomeDetails () {
		List<BudgetIncome> incomeBudget = budgetIncomeRepository.findAll();
		return ResponseEntity.ok(incomeBudget);
	}

	@GetMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<BudgetIncome> getBudgetIncomeById(@PathVariable Long id) {
		BudgetIncome budgetIncome = budgetIncomeRepository.findById(id).get();
		return ResponseEntity.ok(budgetIncome);
	}
	
	@PostMapping (consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?>saveBudgetIncome(@RequestBody BudgetIncome budgetIncome) {
		BudgetIncome save = budgetIncomeRepository.save(budgetIncome);
		URI location = ServletUriComponentsBuilder
				.fromCurrentRequest()
				.path("{id}")
				.buildAndExpand(save.getId())
				.toUri();
		return ResponseEntity.created(location).body(save);
	}
}

