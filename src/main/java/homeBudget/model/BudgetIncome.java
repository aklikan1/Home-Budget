package homeBudget.model;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
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

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class BudgetIncome {

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "income_budget_id")
	private Long id;
	@ManyToMany(cascade=CascadeType.MERGE)
	@JoinTable(name = "mm_Budget_Income_Names",
			joinColumns = {@JoinColumn(name="income_budget_id", referencedColumnName="income_budget_id")},
			inverseJoinColumns = {@JoinColumn(name="income_id", referencedColumnName="income_id")})
	private List<IncomeBasicNames> incomeBasicNames;
	@ManyToMany
	@JoinTable(name = "mm_Budget_Income_Details",
			joinColumns = {@JoinColumn(name="income_budget_id", referencedColumnName="income_budget_id")},
			inverseJoinColumns = {@JoinColumn(name="income_details_id", referencedColumnName="income_details_id")})
	private List<IncomeDetails> incomeDetails;
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
	
	public BudgetIncome() {}

	public BudgetIncome(@NotNull Integer money, @NotNull Date date, String descriptions) {
		super();
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

	public List<IncomeBasicNames> getIncomeBasicNames() {
		return incomeBasicNames;
	}

	public void setIncomeBasicNames(List<IncomeBasicNames> incomeBasicNames) {
		this.incomeBasicNames = incomeBasicNames;
	}

	public List<IncomeDetails> getIncomeDetails() {
		return incomeDetails;
	}

	public void setIncomeDetails(List<IncomeDetails> incomeDetails) {
		this.incomeDetails = incomeDetails;
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
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((incomeBasicNames == null) ? 0 : incomeBasicNames.hashCode());
		result = prime * result + ((incomeDetails == null) ? 0 : incomeDetails.hashCode());
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
		BudgetIncome other = (BudgetIncome) obj;
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
		return "BudgetIncome [id=" + id + ", incomeBasicNames=" + incomeBasicNames + ", incomeDetails=" + incomeDetails
				+ ", money=" + money + ", date=" + date + ", descriptions=" + descriptions + ", user="  +user.getUsername() + "]";
	}

	
	
}
