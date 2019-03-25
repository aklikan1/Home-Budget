package homeBudget.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import homeBudget.repository.ExpensesDetailsRepository;

@RestController
@RequestMapping("/api/expensesDetailsController")
public class ExpensesDetailsController {

	private ExpensesDetailsRepository expensesDetailsRepository;

	@Autowired
	public ExpensesDetailsController(ExpensesDetailsRepository expensesDetailsRepository) {
		this.expensesDetailsRepository = expensesDetailsRepository;
	}
	
	
	
}