package homeBudget.controller.listeners;

import homeBudget.controller.database.HistoryController;
import homeBudget.model.Budget;
import homeBudget.model.User;
import homeBudget.service.BeanUtil;
import lombok.Data;

import java.util.Calendar;

@Data
public class DatabaseListener {

    private HistoryController historyController;
    private String description;
    private Calendar date;
    private User user;
    private Budget budget;

    public void onPrePersist(Object object) {}
    public void onPostPersist(Object object) { }
    public void onPostLoad(Object object) {}
    public void onPreUpdate(Object object) {}
    public void onPostUpdate(Object object) {}
    public void onPreRemove(Object object) {}
    public void onPostRemove(Object object) {}

    private void addDataToHistoryDatabase() {
        historyController = BeanUtil.getBean(HistoryController.class);
        date = Calendar.getInstance();

        historyController.createNewPointToHistory(description, date, user, budget);
    }

    public static void createOwnHistoryPoint (String description, User user, Budget budget) {
        DatabaseListener dl = new DatabaseListener();

        dl.setDescription(description);
        dl.setUser(user);
        dl.setBudget(budget);

        dl.addDataToHistoryDatabase();
    }

}
