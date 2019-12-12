package homeBudget.message.response;

import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public class JwtResponse {

    private String token;
    private String role = "Bearer";
    private String username;
    private String id;
    private Collection<? extends GrantedAuthority> authorities;

    public JwtResponse(String token, String username, Collection<? extends GrantedAuthority> authorities, String id) {
        this.token = token;
        this.username = username;
        this.authorities = authorities;
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }
}
