package homeBudget.controller.listeners;

import homeBudget.model.Budget;
import homeBudget.model.ExpensesBasicNames;
import homeBudget.model.User;
import homeBudget.repository.ExpensesBasicNamesRepository;
import homeBudget.service.BeanUtil;

import javax.persistence.PostLoad;
import javax.persistence.PostPersist;
import javax.persistence.PostRemove;
import javax.persistence.PostUpdate;

public class ExpensesBasicNamesListener extends DatabaseListener {
    private String beforeName = "";
    private Integer beforeEstimateMoney = 0;

    @Override
    @PostPersist
    public void onPostPersist(Object object) {
        ExpensesBasicNames expensesBasicNames = (ExpensesBasicNames) object;
        Budget budget = expensesBasicNames.getBudget();
        User user = budget.getUser();

        String description = "The new expenses category was created";
        DatabaseListener.createOwnHistoryPoint(description, user, budget);
    }

    @Override
    @PostLoad
    public void onPostLoad(Object object) {
        ExpensesBasicNamesRepository expensesBasicNamesRepository = BeanUtil.getBean(ExpensesBasicNamesRepository.class);
        ExpensesBasicNames newExpensesName = (ExpensesBasicNames) object;
        ExpensesBasicNames oldExpensesName = expensesBasicNamesRepository.findById(newExpensesName.getId()).get();
        beforeName = oldExpensesName.getName();
        beforeEstimateMoney = oldExpensesName.getEstimated_money();
    }

    @Override
    @PostUpdate
    public void onPostUpdate(Object object) {
        ExpensesBasicNames expensesBasicNames = (ExpensesBasicNames) object;
        Budget budget = expensesBasicNames.getBudget();
        User user = budget.getUser();
        String description;
        boolean checkName = !expensesBasicNames.getName().equals(beforeName);
        boolean checkEstimatedMoney = !expensesBasicNames.getEstimated_money().equals(beforeEstimateMoney);

        if (checkName && checkEstimatedMoney) {
            description = "The expenses category: \""+ beforeName +"\" has changed name to: \""+expensesBasicNames.getName()
                    + "\" and has changed an estimated money from: "+beforeEstimateMoney+" to: "+expensesBasicNames.getEstimated_money();
            DatabaseListener.createOwnHistoryPoint(description, user, budget);
        } else {
            if (checkName) {
                description = "The expenses category: \""+ beforeName +"\" has changed name to: \""+expensesBasicNames.getName()+"\"";
                DatabaseListener.createOwnHistoryPoint(description, user, budget);
            }
            if (checkEstimatedMoney) {
                description = "The expenses category: \""+ expensesBasicNames.getName() +"\" has changed an estimated money from: "
                        +beforeEstimateMoney+" to: "+expensesBasicNames.getEstimated_money();
                DatabaseListener.createOwnHistoryPoint(description, user, budget);
            }
        }
    }

    @Override
    @PostRemove
    public void onPostRemove(Object object) {
        ExpensesBasicNames expensesBasicNames = (ExpensesBasicNames) object;
        Budget budget = expensesBasicNames.getBudget();
        User user = budget.getUser();

        String description = "The expenses category: \""+expensesBasicNames.getName()+"\" was deleted";
        DatabaseListener.createOwnHistoryPoint(description, user, budget);
    }
}
