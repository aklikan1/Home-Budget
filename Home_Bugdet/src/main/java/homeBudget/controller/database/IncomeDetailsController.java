package homeBudget.controller.database;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import homeBudget.model.IncomeDetails;
import homeBudget.repository.IncomeDetailsRepository;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("/api/incomeDetails")
@CrossOrigin
public class IncomeDetailsController {

	private IncomeDetailsRepository incomeDetailsRepository;
	
	@Autowired
	public IncomeDetailsController(IncomeDetailsRepository incomeDetailsRepository) {
		this.incomeDetailsRepository = incomeDetailsRepository;
	}
	
	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<IncomeDetails>> allIncomeDetails () {
		List<IncomeDetails> incomeDetails = incomeDetailsRepository.findAll();
		return ResponseEntity.ok(incomeDetails);
	}

	@PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> saveIncomeDetails (@RequestBody IncomeDetails incomeDetails) {
		IncomeDetails save = incomeDetailsRepository.save(incomeDetails);
		URI location = ServletUriComponentsBuilder
				.fromCurrentRequest()
				.path("{id}")
				.buildAndExpand(save.getId())
				.toUri();
		return ResponseEntity.created(location).body(save);
	}
	
}

