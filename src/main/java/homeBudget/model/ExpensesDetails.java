package homeBudget.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

@Entity
public class ExpensesDetails {

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "expenses_details_id")
	private Long id;
	@NotNull
	@Column(nullable = false, length=30)
	private String name;
	@NotNull
	@Column(nullable = false)
	private Integer estimate;
	
	@ManyToMany (mappedBy = "expensesDetails")
	private List<BudgetExpenses> budgetExpenses;
	@ManyToOne
	@JoinColumn(name="user_id")
	private User user;
	
	public ExpensesDetails() {}

	public ExpensesDetails(@NotNull String name, @NotNull Integer estimate) {
		this.name = name;
		this.estimate = estimate;
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

	public Integer getEstimate() {
		return estimate;
	}

	public void setEstimate(Integer estimate) {
		this.estimate = estimate;
	}

	public List<BudgetExpenses> getBudgetExpenses() {
		return budgetExpenses;
	}

	public void setBudgetExpenses(List<BudgetExpenses> budgetExpenses) {
		this.budgetExpenses = budgetExpenses;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((budgetExpenses == null) ? 0 : budgetExpenses.hashCode());
		result = prime * result + ((estimate == null) ? 0 : estimate.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		result = prime * result + ((user == null) ? 0 : user.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ExpensesDetails other = (ExpensesDetails) obj;
		if (budgetExpenses == null) {
			if (other.budgetExpenses != null)
				return false;
		} else if (!budgetExpenses.equals(other.budgetExpenses))
			return false;
		if (estimate == null) {
			if (other.estimate != null)
				return false;
		} else if (!estimate.equals(other.estimate))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		if (user == null) {
			if (other.user != null)
				return false;
		} else if (!user.equals(other.user))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "ExpensesDetails [id=" + id + ", name=" + name + ", estimate=" + estimate + ", budgetExpenses="
				+ budgetExpenses + ", user=" + user + "]";
	}
}
