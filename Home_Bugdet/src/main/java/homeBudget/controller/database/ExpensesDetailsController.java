package homeBudget.controller.database;

import homeBudget.model.ExpensesBasicNames;
import homeBudget.model.ExpensesDetails;
import homeBudget.repository.ExpensesBasicNamesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import homeBudget.repository.ExpensesDetailsRepository;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

@RestController
@RequestMapping("/api/expensesDetails")
@CrossOrigin(origins = "http://localhost:4200")
public class ExpensesDetailsController {

	private ExpensesDetailsRepository expensesDetailsRepository;
	private ExpensesBasicNamesRepository expensesBasicNamesRepository;

	@Autowired
	public ExpensesDetailsController(ExpensesDetailsRepository expensesDetailsRepository, ExpensesBasicNamesRepository expensesBasicNamesRepository) {
		this.expensesDetailsRepository = expensesDetailsRepository;
		this.expensesBasicNamesRepository = expensesBasicNamesRepository;
	}

	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<ExpensesDetails>> getAllExpensesDetails() {
		List<ExpensesDetails> expensesDetails = expensesDetailsRepository.findAll();
		return ResponseEntity.ok(expensesDetails);
	}

	@GetMapping(path = "/budget/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<List<ExpensesDetails>>> getAllExpensesDetailsByBudgetId(@PathVariable Long id) {
		List<List<ExpensesDetails>> expensesDetails = expensesDetailsByBudgetId(id);
		return ResponseEntity.ok(expensesDetails);
	}

	@PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> saveExpensesDetails (@RequestBody ExpensesDetails expensesDetails) {
		ExpensesDetails save = expensesDetailsRepository.save(expensesDetails);
		URI location = ServletUriComponentsBuilder
				.fromCurrentRequest()
				.path("{id}")
				.buildAndExpand(save.getId())
				.toUri();
		return ResponseEntity.created(location).body(save);
	}

	@DeleteMapping(path = "/{id}")
	public ResponseEntity<?>deleteExpensesDetailById (@PathVariable Long id) {
		expensesDetailsRepository.deleteById(id);

		return ResponseEntity.noContent().build();
	}

	private List<List<ExpensesDetails>> expensesDetailsByBudgetId(Long id) {
		List<List<ExpensesDetails>> expensesMoney = new ArrayList<>();
		List<ExpensesBasicNames> expensesBasicNames = expensesBasicNamesRepository.getAllByBudgetIdOrderByIdAsc(id);
		for (ExpensesBasicNames expensesBasicName: expensesBasicNames) {
			List<ExpensesDetails> tempExpensesDetails = expensesDetailsRepository.getAllByExpensesBasicNamesIdOrderByIdAsc(expensesBasicName.getId());
			expensesMoney.add(tempExpensesDetails);
		}

		return expensesMoney;
	}

	public List<List<Long>> getExpensesMoneyInTimeByBudgetId(Long id) {
		List<Long> expensesBasicNamesIdByBudgetId = expensesBasicNamesRepository.getExpensesBasicNamesIdByBudgetId(id);
		List<List<Long>> timeMoneyList = new ArrayList<>();

		List<Long> dayMoneyList = expensesMoneyByTime(expensesBasicNamesIdByBudgetId, Calendar.DAY_OF_YEAR);
		List<Long> weekMoneyList = expensesMoneyByTime(expensesBasicNamesIdByBudgetId, Calendar.WEEK_OF_YEAR);
		List<Long> monthMoneyList = expensesMoneyByTime(expensesBasicNamesIdByBudgetId, Calendar.MONTH);

		timeMoneyList.add(dayMoneyList);
		timeMoneyList.add(weekMoneyList);
		timeMoneyList.add(monthMoneyList);

		return timeMoneyList;
	}

	private List<Long> expensesMoneyByTime(List<Long> expensesBasicNamesIdByBudgetId, int calendar) {
		List<Long> moneyList = new ArrayList<>();

		for (int i=11; i>=0; i--) {
			Calendar actualTime = Calendar.getInstance();
			if (calendar == Calendar.MONTH) {
				actualTime.set(Calendar.DAY_OF_MONTH, 31);
			}
			actualTime.add(calendar, -i);
			String changedTime = new SimpleDateFormat("yyyy-MM-dd").format(actualTime.getTime());
			Long money = 0L;
			if (expensesBasicNamesIdByBudgetId.size() != 0) {
				money = expensesDetailsRepository.getSumMoneyByDateAndExpensesNameId(changedTime, expensesBasicNamesIdByBudgetId);
			}

			if (money != null) {
				moneyList.add(money);
			} else {
				moneyList.add(0L);
			}
		}
		return moneyList;
	}
	
}