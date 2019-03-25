package homeBudget.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_id")
	private Long id;
	@NotNull
	@Column (nullable = false, unique = true, length = 20)
	private String username;
	@NotNull
	@Column (nullable = false, length=30)
	private String password;
	@NotNull
	@Column(nullable = false, columnDefinition="TINYINT(1)")
	private boolean is_active;
	@Column(length = 150)
	private String descriptions;
	
	@OneToMany(mappedBy="user")
	@JsonIgnore
	private List<IncomeBasicNames> incomeBasicNames;
	@OneToMany(mappedBy="user")
	@JsonIgnore
	private List<ExpensesBasicNames> expensesBasicNames;
	@OneToMany(mappedBy="user")
	@JsonIgnore
	private List<IncomeDetails> incomeDetails;
	@OneToMany(mappedBy="user")
	@JsonIgnore
	private List<ExpensesDetails> expensesDetails;
	@OneToMany(mappedBy="user", fetch = FetchType.EAGER)
	@JsonIgnore
	private List<BudgetIncome> budgetIncomes;
	@OneToMany(mappedBy="user")
	@JsonIgnore
	private List<BudgetExpenses> budgedExpenses;
	
	public User() {}

	public User(@NotNull String username, @NotNull String password, @NotNull boolean is_active, String descriptions) {
		this.username = username;
		this.password = password;
		this.is_active = is_active;
		this.descriptions = descriptions;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public boolean getIs_active() {
		return is_active;
	}

	public void setIs_active(boolean is_active) {
		this.is_active = is_active;
	}

	public String getDescriptions() {
		return descriptions;
	}

	public void setDescriptions(String descriptions) {
		this.descriptions = descriptions;
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

	public List<IncomeDetails> getIncomeDetails() {
		return incomeDetails;
	}

	public void setIncomeDetails(List<IncomeDetails> incomeDetails) {
		this.incomeDetails = incomeDetails;
	}

	public List<ExpensesDetails> getExpensesDetails() {
		return expensesDetails;
	}

	public void setExpensesDetails(List<ExpensesDetails> expensesDetails) {
		this.expensesDetails = expensesDetails;
	}

	public List<BudgetIncome> getBudgetIncomes() {
		return budgetIncomes;
	}

	public void setBudgetIncomes(List<BudgetIncome> budgetIncomes) {
		this.budgetIncomes = budgetIncomes;
	}

	public List<BudgetExpenses> getBudgedExpenses() {
		return budgedExpenses;
	}

	public void setBudgedExpenses(List<BudgetExpenses> budgedExpenses) {
		this.budgedExpenses = budgedExpenses;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((budgedExpenses == null) ? 0 : budgedExpenses.hashCode());
		result = prime * result + ((budgetIncomes == null) ? 0 : budgetIncomes.hashCode());
		result = prime * result + ((descriptions == null) ? 0 : descriptions.hashCode());
		result = prime * result + ((expensesBasicNames == null) ? 0 : expensesBasicNames.hashCode());
		result = prime * result + ((expensesDetails == null) ? 0 : expensesDetails.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((incomeBasicNames == null) ? 0 : incomeBasicNames.hashCode());
		result = prime * result + ((incomeDetails == null) ? 0 : incomeDetails.hashCode());
		result = prime * result + (is_active ? 1231 : 1237);
		result = prime * result + ((password == null) ? 0 : password.hashCode());
		result = prime * result + ((username == null) ? 0 : username.hashCode());
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
		User other = (User) obj;
		if (budgedExpenses == null) {
			if (other.budgedExpenses != null)
				return false;
		} else if (!budgedExpenses.equals(other.budgedExpenses))
			return false;
		if (budgetIncomes == null) {
			if (other.budgetIncomes != null)
				return false;
		} else if (!budgetIncomes.equals(other.budgetIncomes))
			return false;
		if (descriptions == null) {
			if (other.descriptions != null)
				return false;
		} else if (!descriptions.equals(other.descriptions))
			return false;
		if (expensesBasicNames == null) {
			if (other.expensesBasicNames != null)
				return false;
		} else if (!expensesBasicNames.equals(other.expensesBasicNames))
			return false;
		if (expensesDetails == null) {
			if (other.expensesDetails != null)
				return false;
		} else if (!expensesDetails.equals(other.expensesDetails))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (incomeBasicNames == null) {
			if (other.incomeBasicNames != null)
				return false;
		} else if (!incomeBasicNames.equals(other.incomeBasicNames))
			return false;
		if (incomeDetails == null) {
			if (other.incomeDetails != null)
				return false;
		} else if (!incomeDetails.equals(other.incomeDetails))
			return false;
		if (is_active != other.is_active)
			return false;
		if (password == null) {
			if (other.password != null)
				return false;
		} else if (!password.equals(other.password))
			return false;
		if (username == null) {
			if (other.username != null)
				return false;
		} else if (!username.equals(other.username))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", password=" + password + ", is_active=" + is_active
				+ ", descriptions=" + descriptions + "]";
	}
	
	
}
