package homeBudget.controller.listeners;

import homeBudget.model.Budget;
import homeBudget.model.IncomeDetails;
import homeBudget.model.User;
import homeBudget.repository.IncomeDetailsRepository;
import homeBudget.service.BeanUtil;

import javax.persistence.PostLoad;
import javax.persistence.PostPersist;
import javax.persistence.PostRemove;
import javax.persistence.PostUpdate;

public class IncomeDetailsListener extends DatabaseListener {
    private String beforeName = "";
    private Integer beforeMoney = 0;

    @Override
    @PostPersist
    public void onPostPersist(Object object) {
        IncomeDetails incomeDetails = (IncomeDetails) object;
        Budget budget = incomeDetails.getIncomeBasicNames().getBudget();
        User user = budget.getUser();

        String description = "The new income detail was created";
        DatabaseListener.createOwnHistoryPoint(description, user, budget);
    }

    @Override
    @PostLoad
    public void onPostLoad(Object object) {
        IncomeDetailsRepository incomeDetailsRepository = BeanUtil.getBean(IncomeDetailsRepository.class);
        IncomeDetails newIncomeDetail = (IncomeDetails) object;
        IncomeDetails oldIncomeDetail = incomeDetailsRepository.findById(newIncomeDetail.getId()).get();
        beforeName = oldIncomeDetail.getName();
        beforeMoney = oldIncomeDetail.getMoney();
    }

    @Override
    @PostUpdate
    public void onPostUpdate(Object object) {
        IncomeDetails incomeDetails = (IncomeDetails) object;
        Budget budget = incomeDetails.getIncomeBasicNames().getBudget();
        User user = budget.getUser();
        String description;
        boolean checkName = !incomeDetails.getName().equals(beforeName);
        boolean checkEstimatedMoney = !incomeDetails.getMoney().equals(beforeMoney);

        if (checkName && checkEstimatedMoney) {
            description = "The income detail: \""+ beforeName +"\" has changed name to: \""+incomeDetails.getName()
                    + "\" and has changed a money from: "+ beforeMoney +" to: "+incomeDetails.getMoney();
            DatabaseListener.createOwnHistoryPoint(description, user, budget);
        } else {
            if (checkName) {
                description = "The income detail: \""+ beforeName +"\" has changed name to: \""+incomeDetails.getName()+"\"";
                DatabaseListener.createOwnHistoryPoint(description, user, budget);
            }
            if (checkEstimatedMoney) {
                description = "The income detail: \""+ incomeDetails.getName() +"\" has changed a money from: "
                        + beforeMoney +" to: "+incomeDetails.getMoney();
                DatabaseListener.createOwnHistoryPoint(description, user, budget);
            }
        }
    }

    @Override
    @PostRemove
    public void onPostRemove(Object object) {
        IncomeDetails incomeDetails = (IncomeDetails) object;
        Budget budget = incomeDetails.getIncomeBasicNames().getBudget();
        User user = budget.getUser();

        String description = "The income detail: \""+incomeDetails.getName()+"\" was deleted";
        DatabaseListener.createOwnHistoryPoint(description, user, budget);
    }
}
