package homeBudget.controller.database;

import homeBudget.model.IncomeBasicNames;
import homeBudget.model.IncomeDetails;
import homeBudget.repository.IncomeBasicNamesRepository;
import homeBudget.repository.IncomeDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/incomeDetails")
@CrossOrigin(origins = "http://localhost:4200")
public class IncomeDetailsController {

	private IncomeDetailsRepository incomeDetailsRepository;
	private IncomeBasicNamesRepository incomeBasicNamesRepository;
	
	@Autowired
	public IncomeDetailsController(IncomeDetailsRepository incomeDetailsRepository,
								   IncomeBasicNamesRepository incomeBasicNamesRepository) {
		this.incomeDetailsRepository = incomeDetailsRepository;
		this.incomeBasicNamesRepository = incomeBasicNamesRepository;
	}
	
	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<IncomeDetails>> getAllIncomeDetails() {
		List<IncomeDetails> incomeDetails = incomeDetailsRepository.findAll();
		return ResponseEntity.ok(incomeDetails);
	}

	@GetMapping(path = "/incomeNames/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<IncomeDetails>> getAllIncomeDetailsByIncomeBasicNames(@PathVariable Long id) {
		List<IncomeDetails> incomeDetails = incomeDetailsRepository.getAllByIncomeBasicNamesId(id);
		return ResponseEntity.ok(incomeDetails);
	}

	@GetMapping(path = "/budget/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<IncomeDetails>> getAllIncomeDetailsByBudgetId(@PathVariable Long id) {
		List<IncomeDetails> incomeDetails = incomeDetailsByBudgetId(id);
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

	private List<IncomeDetails> incomeDetailsByBudgetId(Long id) {
		List<IncomeDetails> incomeMoney = new ArrayList<>();
		List<IncomeBasicNames> incomeBasicNames = incomeBasicNamesRepository.getAllByBudgetId(id);
		for (IncomeBasicNames incomeBasicName: incomeBasicNames) {
			List<IncomeDetails> tempIncomeDetails = incomeDetailsRepository.getAllByIncomeBasicNamesId(incomeBasicName.getId());
			incomeMoney.addAll(tempIncomeDetails);
		}

		return incomeMoney;
	}

	public List<List<Long>> incomeMoneyInTimeByBudgetId(Long id) {
		List<Long> incomeBasicNamesIdByBudgetId = incomeBasicNamesRepository.getIncomeBasicNamesIdByBudgetId(id);
		List<List<Long>> timeMoneyList = new ArrayList<>();

		List<Long> dayMoneyList = incomeMoneyByTime(incomeBasicNamesIdByBudgetId, Calendar.DAY_OF_YEAR);
		List<Long> weekMoneyList = incomeMoneyByTime(incomeBasicNamesIdByBudgetId, Calendar.WEEK_OF_YEAR);
		List<Long> monthMoneyList = incomeMoneyByTime(incomeBasicNamesIdByBudgetId, Calendar.MONTH);

		timeMoneyList.add(dayMoneyList);
		timeMoneyList.add(weekMoneyList);
		timeMoneyList.add(monthMoneyList);

		return timeMoneyList;
	}

	private List<Long> incomeMoneyByTime (List<Long> incomeBasicNamesIdByBudgetId, int calendar) {
		List<Long> moneyList = new ArrayList<>();

		for (int i=11; i>=0; i--) {
			Calendar actualTime = Calendar.getInstance();
			actualTime.add(calendar, -i);
			String changedTime = new SimpleDateFormat("yyyy-MM-dd").format(actualTime.getTime());
			Long money = 0L;
			if (incomeBasicNamesIdByBudgetId.size() != 0) {
				money = incomeDetailsRepository.getSumMoneyByDateAndIncomeNameId(changedTime, incomeBasicNamesIdByBudgetId);
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

