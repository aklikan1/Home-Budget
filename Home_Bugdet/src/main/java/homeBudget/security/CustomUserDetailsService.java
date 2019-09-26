package homeBudget.security;

import homeBudget.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

//@Component
public class CustomUserDetailsService { //implements UserDetailsService {

    private UserRepository userRepository;

    @Autowired
    public void setUserRepository (UserRepository userRepository) {
        this.userRepository = userRepository;
    }
/*
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findUserByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        org.springframework.security.core.userdetails.User userDetails =
                new org.springframework.security.core.userdetails.User(
                        user.getUsername(),
                        user.getPassword(),
                        convertAuthorities(user.getRoles())
                );

        return userDetails;
    }

    private Set<GrantedAuthority> convertAuthorities (Set<Role> userRole) {
        Set<GrantedAuthority> authorities = new HashSet<>();
        for (Role ur: userRole) {
            authorities.add(new SimpleGrantedAuthority(ur.getRoles()));
        }

        return authorities;
    }


 */

}
