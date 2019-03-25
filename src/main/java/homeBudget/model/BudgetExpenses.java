package homeBudget.model;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

@Entity
public class BudgetExpenses {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "expenses_budget_id")
	private Long id;
	@ManyToMany
	@JoinTable(name = "mm_Budget_Expenses_Names",
			joinColumns = {@JoinColumn(name="expenses_budget_id", referencedColumnName="expenses_budget_id")},
			inverseJoinColumns = {@JoinColumn(name="expenses_id", referencedColumnName="expenses_id")})
	private List<ExpensesBasicNames> expensesBasicNames;
	@ManyToMany
	@JoinTable(name = "mm_Budget_Expenses_Details",
			joinColumns = {@JoinColumn(name="expenses_budget_id", referencedColumnName="expenses_budget_id")},
			inverseJoinColumns = {@JoinColumn(name="expenses_details_id", referencedColumnName="expenses_details_id")})
	private List<ExpensesDetails> expensesDetails;
	@NotNull
	@Column(nullable = false)
	private Integer money;
	@NotNull
	@Column(nullable = false)
	@Temporal(TemporalType.DATE)
	private Date date;
	private String descriptions;
	@ManyToOne
	@JoinColumn(name="user_id")
	private User user;
	
	public BudgetExpenses() {}

	public BudgetExpenses(@NotNull Integer money, @NotNull Date date, String descriptions) {
		this.money = money;
		this.date = date;
		this.descriptions = descriptions;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public List<ExpensesBasicNames> getExpensesBasicNames() {
		return expensesBasicNames;
	}

	public void setExpensesBasicNames(List<ExpensesBasicNames> expensesBasicNames) {
		this.expensesBasicNames = expensesBasicNames;
	}

	public List<ExpensesDetails> getExpensesDetails() {
		return expensesDetails;
	}

	public void setExpensesDetails(List<ExpensesDetails> expensesDetails) {
		this.expensesDetails = expensesDetails;
	}

	public Integer getMoney() {
		return money;
	}

	public void setMoney(Integer money) {
		this.money = money;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getDescriptions() {
		return descriptions;
	}

	public void setDescriptions(String descriptions) {
		this.descriptions = descriptions;
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
		result = prime * result + ((date == null) ? 0 : date.hashCode());
		result = prime * result + ((descriptions == null) ? 0 : descriptions.hashCode());
		result = prime * result + ((expensesBasicNames == null) ? 0 : expensesBasicNames.hashCode());
		result = prime * result + ((expensesDetails == null) ? 0 : expensesDetails.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((money == null) ? 0 : money.hashCode());
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
		BudgetExpenses other = (BudgetExpenses) obj;
		if (date == null) {
			if (other.date != null)
				return false;
		} else if (!date.equals(other.date))
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
		if (money == null) {
			if (other.money != null)
				return false;
		} else if (!money.equals(other.money))
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
		return "BudgetExpenses [id=" + id + ", expensesBasicNames=" + expensesBasicNames + ", expensesDetails="
				+ expensesDetails + ", money=" + money + ", date=" + date + ", descriptions=" + descriptions + ", user="
				+ user + "]";
	}
}
