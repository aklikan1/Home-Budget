package homeBudget.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;
    @NotNull
    @Column(nullable = false, unique = true, length = 20)
    private String username;
    @NotNull
    @Column(nullable = false, length = 500)
    private String password;
    @NotNull
    @Column(nullable = false, columnDefinition = "TINYINT(1)", name = "active")
    private boolean is_active;
    @Column(length = 300)
    private String descriptions;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Budget> budget;

    @ManyToMany(cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
    @Fetch(FetchMode.SELECT)
    @JoinTable(name="mm_User_Role",
                joinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "user_id")},
                inverseJoinColumns = {@JoinColumn(name = "role_id", referencedColumnName = "role_id")}
                )
    private Set<Role> roles = new HashSet<>();

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

    public boolean isIs_active() {
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

    public List<Budget> getBudget() {
        return budget;
    }

    public void setBudget(List<Budget> budget) {
        this.budget = budget;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return is_active == user.is_active &&
                Objects.equals(id, user.id) &&
                Objects.equals(username, user.username) &&
                Objects.equals(password, user.password) &&
                Objects.equals(descriptions, user.descriptions) &&
                Objects.equals(budget, user.budget) &&
                Objects.equals(roles, user.roles);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, username, password, is_active, descriptions, budget, roles);
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", is_active=" + is_active +
                ", descriptions='" + descriptions + '\'' +
                ", budget=" + budget +
                ", roles=" + roles +
                '}';
    }
}
