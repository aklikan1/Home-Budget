package homeBudget.controller.database;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import homeBudget.model.IncomeBasicNames;
import homeBudget.repository.IncomeBasicNamesRepository;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("/api/incomeBasicNames")
@CrossOrigin
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

	@GetMapping (path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<IncomeBasicNames> getIncomeBasicNamesById(@PathVariable Long id) {
		IncomeBasicNames incomeBasicNames = incomeBasicNamesRepository.findById(id).get();
		return ResponseEntity.ok(incomeBasicNames);
	}

	@PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> saveIncomeBasicNames (@RequestBody IncomeBasicNames incomeBasicNames) {
		IncomeBasicNames save = incomeBasicNamesRepository.save(incomeBasicNames);
		URI location = ServletUriComponentsBuilder
				.fromCurrentRequest()
				.path("{id}")
				.buildAndExpand(save.getId())
				.toUri();

		return ResponseEntity.created(location).body(save);
	}
}

