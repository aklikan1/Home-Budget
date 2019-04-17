package homeBudget.model;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class Role {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "role_id")
	private Long id;
	private String roles;
	private String description;

	public Role() {}

	public Role(String roles, String description) {
		this.roles = roles;
		this.description = description;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getRoles() {
		return roles;
	}

	public void setRoles(String roles) {
		this.roles = roles;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		Role role1 = (Role) o;
		return Objects.equals(id, role1.id) &&
				Objects.equals(roles, role1.roles) &&
				Objects.equals(description, role1.description);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, roles, description);
	}

	@Override
	public String toString() {
		return "Role{" +
				"id=" + id +
				", role='" + roles + '\'' +
				", description='" + description + '\'' +
				'}';
	}
}