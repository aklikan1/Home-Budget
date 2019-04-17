package homeBudget.service;

import homeBudget.model.Role;
import homeBudget.model.User;
import homeBudget.repository.RoleRepository;
import homeBudget.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private static final String DEFAULT_ROLE = "ROLE_USER";
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public void setUserRepository (UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Autowired
    public void setRoleRepository (RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public User addWithDefaultRole (User user) {
        Role defaultRole = roleRepository.findByRoles(DEFAULT_ROLE);
        user.getRoles().add(defaultRole);
        return user;
    }
}

