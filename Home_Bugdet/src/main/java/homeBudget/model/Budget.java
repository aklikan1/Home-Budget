package homeBudget.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import homeBudget.controller.listeners.BudgetListener;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Objects;

@Entity
@EntityListeners(BudgetListener.class)
public class Budget {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "budget_id")
    private Long id;
    @NotNull
    @Column(nullable = false, length = 50)
    private String name;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany (mappedBy = "budget")
    @JsonIgnore
    @Cascade(org.hibernate.annotations.CascadeType.DELETE)
    private List<IncomeBasicNames> incomeBasicNames;
    @OneToMany (mappedBy = "budget")
    @JsonIgnore
    @Cascade(org.hibernate.annotations.CascadeType.DELETE)
    private  List<ExpensesBasicNames> expensesBasicNames;

    public Budget() { }

    public Budget(@NotNull String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<IncomeBasicNames> getIncomeBasicNames() {
        return incomeBasicNames;
    }

    public void setIncomeBasicNames(List<IncomeBasicNames> incomeBasicNames) {
        this.incomeBasicNames = incomeBasicNames;
    }

    public List<ExpensesBasicNames> getExpensesBasicNames() {
        return expensesBasicNames;
    }

    public void setExpensesBasicNames(List<ExpensesBasicNames> expensesBasicNames) {
        this.expensesBasicNames = expensesBasicNames;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Budget budget = (Budget) o;
        return Objects.equals(id, budget.id) &&
                Objects.equals(name, budget.name) &&
                Objects.equals(user, budget.user) &&
                Objects.equals(incomeBasicNames, budget.incomeBasicNames) &&
                Objects.equals(expensesBasicNames, budget.expensesBasicNames);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, user, incomeBasicNames, expensesBasicNames);
    }

    @Override
    public String toString() {
        return "Budget{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", user=" + user +
                ", incomeBasicNames=" + incomeBasicNames +
                ", expensesBasicNames=" + expensesBasicNames +
                '}';
    }

    //@PostUpdate
    private void postUpdateBudget() {
        System.out.println("Test post update Budget");
    }

    //@PostPersist
    private void postPersistBudget() {
        System.out.println("Test post persist Budget");
    }
}