package homeBudget.controller.listeners;

import homeBudget.model.Budget;
import homeBudget.model.ExpensesDetails;
import homeBudget.model.User;
import homeBudget.repository.ExpensesDetailsRepository;
import homeBudget.service.BeanUtil;

import javax.persistence.PostLoad;
import javax.persistence.PostPersist;
import javax.persistence.PostRemove;
import javax.persistence.PostUpdate;

public class ExpensesDetailsListener extends DatabaseListener {
    private String beforeName = "";
    private Integer beforeMoney = 0;

    @Override
    @PostPersist
    public void onPostPersist(Object object) {
        ExpensesDetails expensesDetails = (ExpensesDetails) object;
        Budget budget = expensesDetails.getExpensesBasicNames().getBudget();
        User user = budget.getUser();

        String description = "The new expenses detail was created";
        DatabaseListener.createOwnHistoryPoint(description, user, budget);
    }

    @Override
    @PostLoad
    public void onPostLoad(Object object) {
        ExpensesDetailsRepository expensesDetailsRepository = BeanUtil.getBean(ExpensesDetailsRepository.class);
        ExpensesDetails newExpensesDetail = (ExpensesDetails) object;
        ExpensesDetails oldExpensesDetail = expensesDetailsRepository.findById(newExpensesDetail.getId()).get();
        beforeName = oldExpensesDetail.getName();
        beforeMoney = oldExpensesDetail.getMoney();
    }

    @Override
    @PostUpdate
    public void onPostUpdate(Object object) {
        ExpensesDetails expensesDetails = (ExpensesDetails) object;
        Budget budget = expensesDetails.getExpensesBasicNames().getBudget();
        User user = budget.getUser();
        String description;
        boolean checkName = !expensesDetails.getName().equals(beforeName);
        boolean checkEstimatedMoney = !expensesDetails.getMoney().equals(beforeMoney);

        if (checkName && checkEstimatedMoney) {
            description = "The expenses detail: \""+ beforeName +"\" has changed name to: \""+expensesDetails.getName()
                    + "\" and has changed a money from: "+ beforeMoney +" to: "+expensesDetails.getMoney();
            DatabaseListener.createOwnHistoryPoint(description, user, budget);
        } else {
            if (checkName) {
                description = "The expenses detail: \""+ beforeName +"\" has changed name to: \""+expensesDetails.getName()+"\"";
                DatabaseListener.createOwnHistoryPoint(description, user, budget);
            }
            if (checkEstimatedMoney) {
                description = "The expenses detail: \""+ expensesDetails.getName() +"\" has changed a money from: "
                        + beforeMoney +" to: "+expensesDetails.getMoney();
                DatabaseListener.createOwnHistoryPoint(description, user, budget);
            }
        }
    }

    @Override
    @PostRemove
    public void onPostRemove(Object object) {
        ExpensesDetails expensesDetails = (ExpensesDetails) object;
        Budget budget = expensesDetails.getExpensesBasicNames().getBudget();
        User user = budget.getUser();

        String description = "The expenses detail: \""+expensesDetails.getName()+"\" was deleted";
        DatabaseListener.createOwnHistoryPoint(description, user, budget);
    }
}
