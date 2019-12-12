package homeBudget.controller.viewModel;

public class BudgetBaseNameAndDetailsMoney {

    private String name ;
    private Long money ;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getMoney() {
        return money;
    }

    public void setMoney(Long money) {
        this.money = money;
    }

    @Override
    public String toString() {
        return "BudgetBaseNameAndDetailsMoney{" +
                "name='" + name + '\'' +
                ", money=" + money +
                '}';
    }
}
