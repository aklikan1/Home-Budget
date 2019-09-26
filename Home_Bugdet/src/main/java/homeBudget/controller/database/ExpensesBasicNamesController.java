package homeBudget.controller.database;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import homeBudget.model.ExpensesBasicNames;
import homeBudget.repository.ExpensesBasicNamesRepository;

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
		System.out.println(expensesBasicNames);
		return ResponseEntity.ok(expensesBasicNames);
	}
}

