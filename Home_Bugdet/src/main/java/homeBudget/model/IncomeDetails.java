package homeBudget.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Calendar;
import java.util.Date;
import java.util.Objects;

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
	@Temporal(TemporalType.DATE)
	private Calendar date;
	@Column(length = 150)
	private String descriptions;
	@NotNull
	@Column(nullable = false)
	private Integer money;

	@ManyToOne
	@JoinColumn(name = "income_name_id")
	private IncomeBasicNames incomeBasicNames;

	public IncomeDetails() {}

	public IncomeDetails(@NotNull String name, @NotNull Calendar date, String descriptions, @NotNull Integer money) {
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

	public IncomeBasicNames getIncomeBasicNames() {
		return incomeBasicNames;
	}

	public void setIncomeBasicNames(IncomeBasicNames incomeBasicNames) {
		this.incomeBasicNames = incomeBasicNames;
	}

	public Integer getMoney() {
		return money;
	}

	public void setMoney(Integer money) {
		this.money = money;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		IncomeDetails that = (IncomeDetails) o;
		return Objects.equals(id, that.id) &&
				Objects.equals(name, that.name) &&
				Objects.equals(date, that.date) &&
				Objects.equals(descriptions, that.descriptions) &&
				Objects.equals(money, that.money) &&
				Objects.equals(incomeBasicNames, that.incomeBasicNames);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, name, date, descriptions, money, incomeBasicNames);
	}

	@Override
	public String toString() {
		return "IncomeDetails{" +
				"id=" + id +
				", name='" + name + '\'' +
				", date=" + date +
				", descriptions='" + descriptions + '\'' +
				", money=" + money +
				", incomeBasicNames=" + incomeBasicNames +
				'}';
	}
}