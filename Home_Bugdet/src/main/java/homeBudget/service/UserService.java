package homeBudget.service;

import homeBudget.repository.RoleRepository;
import homeBudget.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

//@Service
class UserService {
    private static final String DEFAULT_ROLE = "ROLE_USER";
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    //private PasswordEncoder passwordEncoder;

    /*
    @Autowired
    public UserService (PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

     */

    @Autowired
    public void setUserRepository (UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Autowired
    public void setRoleRepository (RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }
/*
    public User addWithDefaultRole (User user) {
        Role defaultRole = roleRepository.findByRoles(DEFAULT_ROLE);
        user.getRoles().add(defaultRole);
        String passwordHash = passwordEncoder.encode(user.getPassword());
        user.setPassword(passwordHash);
        user.setIs_active(true);
        return user;
    }

 */
}

