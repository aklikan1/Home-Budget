package homeBudget.model;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Objects;

import javax.persistence.*;
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
	@Temporal(TemporalType.DATE)
	private Calendar date;
	@Column(length = 300)
	private String descriptions;
	@NotNull
	@Column(nullable = false)
	private Integer money;

	@ManyToOne
	@JoinColumn(name = "expenses_name_id")
	private ExpensesBasicNames expensesBasicNames;

	public ExpensesDetails() {}

	public ExpensesDetails(@NotNull String name, @NotNull Calendar date, String descriptions, @NotNull Integer money) {
		this.name = name;
		this.date = date;
		this.descriptions = descriptions;
		this.money = money;
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

	public Calendar getDate() {
		return date;
	}

	public void setDate(Calendar date) {
		this.date = date;
	}

	public String getDescriptions() {
		return descriptions;
	}

	public void setDescriptions(String descriptions) {
		this.descriptions = descriptions;
	}

	public Integer getMoney() {
		return money;
	}

	public void setMoney(Integer money) {
		this.money = money;
	}

	public ExpensesBasicNames getExpensesBasicNames() {
		return expensesBasicNames;
	}

	public void setExpensesBasicNames(ExpensesBasicNames expensesBasicNames) {
		this.expensesBasicNames = expensesBasicNames;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		ExpensesDetails that = (ExpensesDetails) o;
		return Objects.equals(id, that.id) &&
				Objects.equals(name, that.name) &&
				Objects.equals(date, that.date) &&
				Objects.equals(descriptions, that.descriptions) &&
				Objects.equals(money, that.money) &&
				Objects.equals(expensesBasicNames, that.expensesBasicNames);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, name, date, descriptions, money, expensesBasicNames);
	}

	@Override
	public String toString() {
		return "ExpensesDetails{" +
				"id=" + id +
				", name='" + name + '\'' +
				", date=" + date +
				", descriptions='" + descriptions + '\'' +
				", money=" + money +
				'}';
	}
}