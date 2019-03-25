package homeBudget.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import homeBudget.model.IncomeBasicNames;
import homeBudget.repository.IncomeBasicNamesRepository;

@RestController
@RequestMapping("/api/incomeBasicNames")
public class IncomeBasicNamesController {
	
	private IncomeBasicNamesRepository incomeBasicNamesRepository;
	
	@Autowired
	public IncomeBasicNamesController (IncomeBasicNamesRepository incomeBasicNamesRepository) {
		this.incomeBasicNamesRepository = incomeBasicNamesRepository;
	}
	
	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<IncomeBasicNames>> allIncomeBasicNames () {
		List<IncomeBasicNames> incomeBasicNames = incomeBasicNamesRepository.findAll();
		return ResponseEntity.ok(incomeBasicNames);
	}
}

