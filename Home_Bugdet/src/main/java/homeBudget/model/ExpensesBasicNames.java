package homeBudget.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;
import java.util.Objects;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
public class ExpensesBasicNames {

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "expenses_name_id")
	private Long id;
	@NotNull
	@Column(nullable = false, length=30)
	private String name;
	@NotNull
	@Column(nullable = false)
	private Integer estimated_money;

	@ManyToOne
	@JoinColumn(name = "budget_id")
	private Budget budget;

	@OneToMany (mappedBy = "expensesBasicNames")
	@JsonIgnore
	private List<ExpensesDetails> expensesDetails;

	public ExpensesBasicNames() {}

	public ExpensesBasicNames(@NotNull String name, @NotNull Integer estimated_money) {
		this.name = name;
		this.estimated_money = estimated_money;
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

	public Integer getEstimated_money() {
		return estimated_money;
	}

	public void setEstimated_money(Integer estimated_money) {
		this.estimated_money = estimated_money;
	}

	public Budget getBudget() {
		return budget;
	}

	public void setBudget(Budget budget) {
		this.budget = budget;
	}

	public List<ExpensesDetails> getExpensesDetails() {
		return expensesDetails;
	}

	public void setExpensesDetails(List<ExpensesDetails> expensesDetails) {
		this.expensesDetails = expensesDetails;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		ExpensesBasicNames that = (ExpensesBasicNames) o;
		return Objects.equals(id, that.id) &&
				Objects.equals(name, that.name) &&
				Objects.equals(estimated_money, that.estimated_money) &&
				Objects.equals(budget, that.budget) &&
				Objects.equals(expensesDetails, that.expensesDetails);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, name, estimated_money, budget, expensesDetails);
	}

	@Override
	public String toString() {
		return "ExpensesBasicNames{" +
				"id=" + id +
				", name='" + name + '\'' +
				", estimated_money=" + estimated_money +
				", budget=" + budget +
				", expensesDetails=" + expensesDetails +
				'}';
	}
}