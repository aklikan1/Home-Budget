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
public class IncomeBasicNames {

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "income_id")
	private Long id;
	@NotNull
	@Column(nullable = false, length=30)
	private String name;
	
	@ManyToMany (mappedBy = "incomeBasicNames")
	private List<BudgetIncome> budgetIncomes;
	@ManyToOne
	@JoinColumn(name="user_id")
	private User user;
	
	
	public IncomeBasicNames() {}

	public IncomeBasicNames(@NotNull String name) {
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

	public List<BudgetIncome> getBudgetIncomes() {
		return budgetIncomes;
	}

	public void setBudgetIncomes(List<BudgetIncome> budgetIncomes) {
		this.budgetIncomes = budgetIncomes;
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
		result = prime * result + ((budgetIncomes == null) ? 0 : budgetIncomes.hashCode());
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
		IncomeBasicNames other = (IncomeBasicNames) obj;
		if (budgetIncomes == null) {
			if (other.budgetIncomes != null)
				return false;
		} else if (!budgetIncomes.equals(other.budgetIncomes))
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
		return "IncomeBasicNames [id=" + id + ", name=" + name + ", budgetIncomes=" + budgetIncomes + ", user=" + user
				+ "]";
	}

	
}
