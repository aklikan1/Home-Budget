package homeBudget.controller.listeners;

import homeBudget.model.Budget;
import homeBudget.model.User;
import homeBudget.repository.BudgetRepository;
import homeBudget.service.BeanUtil;

import javax.persistence.PostLoad;
import javax.persistence.PostPersist;
import javax.persistence.PostRemove;
import javax.persistence.PostUpdate;

public class BudgetListener extends DatabaseListener {

    private String before = "";

    @Override
    @PostPersist
    public void onPostPersist(Object object) {
        Budget budget = (Budget) object;
        User user = budget.getUser();

        String description = "The new budget: \""+budget.getName()+"\" was created";
        DatabaseListener.createOwnHistoryPoint(description, user, budget);
    }

    @Override
    @PostLoad
    public void onPostLoad(Object object) {
        BudgetRepository budgetRepository = BeanUtil.getBean(BudgetRepository.class);
        Budget newBudget = (Budget) object;
        Budget oldBudget = budgetRepository.findById(newBudget.getId()).get();
        before = oldBudget.getName();
    }

    @Override
    @PostUpdate
    public void onPostUpdate(Object object) {
        Budget budget = (Budget) object;
        User user = budget.getUser();

        if (!budget.getName().equals(before)) {
            String description = "The budget: \""+before+"\" has changed name to: \""+budget.getName()+"\"";
            DatabaseListener.createOwnHistoryPoint(description, user, budget);
        }

    }

    @Override
    @PostRemove
    public void onPostRemove(Object object) {
        Budget budget = (Budget) object;
        User user = budget.getUser();

        String description = "The budget: \""+budget.getName()+"\" was deleted";
        DatabaseListener.createOwnHistoryPoint(description, user, budget);
    }
}
