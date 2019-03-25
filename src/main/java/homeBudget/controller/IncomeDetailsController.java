package homeBudget.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import homeBudget.model.IncomeDetails;
import homeBudget.repository.IncomeDetailsRepository;

@RestController
@RequestMapping("/api/incomeDetails")
public class IncomeDetailsController {

	private IncomeDetailsRepository incomeDetailsRepository;
	
	@Autowired
	public IncomeDetailsController(IncomeDetailsRepository incomeDetailsRepository) {
		this.incomeDetailsRepository = incomeDetailsRepository;
	}
	
	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	ResponseEntity<List<IncomeDetails>> allIncomeDetails () {
		List<IncomeDetails> incomeDetails = incomeDetailsRepository.findAll();
		return ResponseEntity.ok(incomeDetails);
	}
	
}

