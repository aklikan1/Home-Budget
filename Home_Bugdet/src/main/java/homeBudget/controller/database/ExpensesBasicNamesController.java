package homeBudget.controller.database;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import homeBudget.model.ExpensesBasicNames;
import homeBudget.repository.ExpensesBasicNamesRepository;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("/api/expensesBasicNames")
@CrossOrigin
public class ExpensesBasicNamesController {

	private ExpensesBasicNamesRepository expensesBasicNamesRepository;

	@Autowired
	public ExpensesBasicNamesController (ExpensesBasicNamesRepository expensesBasicNamesRepository) {
		this.expensesBasicNamesRepository = expensesBasicNamesRepository;
	}
	
	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<ExpensesBasicNames>> allExpensesBasicNames () {
		List<ExpensesBasicNames> expensesBasicNames = expensesBasicNamesRepository.findAll();
		return ResponseEntity.ok(expensesBasicNames);
	}

	@GetMapping(path = "/budget/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<ExpensesBasicNames>> getExpensesBasicNamesByBudgetId(@PathVariable Long id) {
		List<ExpensesBasicNames> expensesBasicNames = expensesBasicNamesRepository.getAllByBudgetIdOrderByIdAsc(id);
		return ResponseEntity.ok(expensesBasicNames);
	}

	@PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> saveExpensesBasicNames (@RequestBody ExpensesBasicNames expensesBasicNames) {
		ExpensesBasicNames save = expensesBasicNamesRepository.save(expensesBasicNames);
		URI location = ServletUriComponentsBuilder
				.fromCurrentRequest()
				.path("{id}")
				.buildAndExpand(save.getId())
				.toUri();

		return ResponseEntity.created(location).body(save);
	}

	@DeleteMapping(path = "/{id}")
	public ResponseEntity<?>deleteBasicNameById (@PathVariable Long id) {
		expensesBasicNamesRepository.deleteById(id);

		return ResponseEntity.noContent().build();
	}
}

