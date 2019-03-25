package homeBudget.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
public class IncomeDetails {

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "income_details_id")
	private Long id;
	@NotNull
	@Column(nullable = false, length=30)
	private String name;
	@NotNull
	@Column(nullable = false)
	private Integer estimate;
	
	@ManyToMany (mappedBy = "incomeDetails")
	private List<BudgetIncome> budgetIncomes;
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="user_id")
	private User user;
	
	public IncomeDetails() {}

	public IncomeDetails(@NotNull String name, @NotNull Integer estimate) {
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
		IncomeDetails other = (IncomeDetails) obj;
		if (budgetIncomes == null) {
			if (other.budgetIncomes != null)
				return false;
		} else if (!budgetIncomes.equals(other.budgetIncomes))
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
		return "IncomeDetails [id=" + id + ", name=" + name + ", estimate=" + estimate + ", budgetIncomes="
				+ budgetIncomes + ", user=" + user + "]";
	}
}

