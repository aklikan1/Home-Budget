package homeBudget.controller.listeners;

import homeBudget.model.Budget;
import homeBudget.model.IncomeBasicNames;
import homeBudget.model.User;
import homeBudget.repository.IncomeBasicNamesRepository;
import homeBudget.service.BeanUtil;

import javax.persistence.PostLoad;
import javax.persistence.PostPersist;
import javax.persistence.PostRemove;
import javax.persistence.PostUpdate;

public class IncomeBasicNameListener extends DatabaseListener {

    private String beforeName = "";
    private Integer beforeEstimateMoney = 0;

    @Override
    @PostPersist
    public void onPostPersist(Object object) {
        IncomeBasicNames incomeBasicNames = (IncomeBasicNames) object;
        Budget budget = incomeBasicNames.getBudget();
        User user = budget.getUser();

        String description = "The new income category was created";
        DatabaseListener.createOwnHistoryPoint(description, user, budget);
    }

    @Override
    @PostLoad
    public void onPostLoad(Object object) {
        IncomeBasicNamesRepository incomeBasicNamesRepository = BeanUtil.getBean(IncomeBasicNamesRepository.class);
        IncomeBasicNames newIncomeName = (IncomeBasicNames) object;
        IncomeBasicNames oldIncomeName = incomeBasicNamesRepository.findById(newIncomeName.getId()).get();
        beforeName = oldIncomeName.getName();
        beforeEstimateMoney = oldIncomeName.getEstimated_money();
    }

    @Override
    @PostUpdate
    public void onPostUpdate(Object object) {
        IncomeBasicNames incomeBasicNames = (IncomeBasicNames) object;
        Budget budget = incomeBasicNames.getBudget();
        User user = budget.getUser();
        String description;
        boolean checkName = !incomeBasicNames.getName().equals(beforeName);
        boolean checkEstimatedMoney = !incomeBasicNames.getEstimated_money().equals(beforeEstimateMoney);

        if (checkName && checkEstimatedMoney) {
            description = "The income category: \""+ beforeName +"\" has changed name to: \""+incomeBasicNames.getName()
                    + "\" and has changed an estimated money from: "+beforeEstimateMoney+" to: "+incomeBasicNames.getEstimated_money();
            DatabaseListener.createOwnHistoryPoint(description, user, budget);
        } else {
            if (checkName) {
                description = "The income category: \""+ beforeName +"\" has changed name to: \""+incomeBasicNames.getName()+"\"";
                DatabaseListener.createOwnHistoryPoint(description, user, budget);
            }
            if (checkEstimatedMoney) {
                description = "The income category: \""+ incomeBasicNames.getName() +"\" has changed an estimated money from: "
                        +beforeEstimateMoney+" to: "+incomeBasicNames.getEstimated_money();
                DatabaseListener.createOwnHistoryPoint(description, user, budget);
            }
        }
    }

    @Override
    @PostRemove
    public void onPostRemove(Object object) {
        IncomeBasicNames incomeBasicNames = (IncomeBasicNames) object;
        Budget budget = incomeBasicNames.getBudget();
        User user = budget.getUser();

        String description = "The income category: \""+incomeBasicNames.getName()+"\" was deleted";
        DatabaseListener.createOwnHistoryPoint(description, user, budget);
    }
}
