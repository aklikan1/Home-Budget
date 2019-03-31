package homeBudget.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity
public class Role {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "role_id")
	private Long id;
	private String role_name;
	private String description;

	@ManyToMany(mappedBy = "role")
	@JsonIgnore
	private List<User> user;

	public Role() {}

	public Role(String role_name, String description) {
		this.role_name = role_name;
		this.description = description;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getRole_name() {
		return role_name;
	}

	public void setRole_name(String role_name) {
		this.role_name = role_name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<User> getUser() {
		return user;
	}

	public void setUser(List<User> user) {
		this.user = user;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		Role role = (Role) o;
		return Objects.equals(id, role.id) &&
				Objects.equals(role_name, role.role_name) &&
				Objects.equals(description, role.description) &&
				Objects.equals(user, role.user);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, role_name, description, user);
	}

	@Override
	public String toString() {
		return "Role{" +
				"id=" + id +
				", role_name='" + role_name + '\'' +
				", description='" + description + '\'' +
				'}';
	}
}