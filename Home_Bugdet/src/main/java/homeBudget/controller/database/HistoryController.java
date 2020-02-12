package homeBudget.controller.database;

import homeBudget.model.Budget;
import homeBudget.model.History;
import homeBudget.model.User;
import homeBudget.repository.HistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Calendar;
import java.util.List;

@RestController
@RequestMapping(path = "/api/history")
@CrossOrigin(origins = "http://localhost:4200")
public class HistoryController {

    private HistoryRepository historyRepository;

    @Autowired
    public HistoryController(HistoryRepository historyRepository) {
        this.historyRepository = historyRepository;
    }

    @GetMapping(path = "/user/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<History>> findAllHistoryByUserId (@PathVariable Long id) {
        List<History> historyList = historyRepository.findAllByUserIdOrderByIdDesc(id);

        return ResponseEntity.ok(historyList);
    }

    public void createNewPointToHistory(String description, Calendar date, User user, Budget budget) {

        History history = new History();

        history.setDescription(description);
        history.setDate(date);
        history.setUser(user);
        if (budget == null) {
            history.setBudgetName("");
        } else {
            history.setBudgetName(budget.getName());
        }

        historyRepository.save(history);
    }


}
