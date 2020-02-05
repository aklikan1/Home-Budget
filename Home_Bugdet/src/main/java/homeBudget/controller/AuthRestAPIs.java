package homeBudget.controller;

import homeBudget.message.request.LoginForm;
import homeBudget.message.request.SignUpForm;
import homeBudget.message.response.JwtResponse;
import homeBudget.message.response.ResponseMessage;
import homeBudget.model.*;
import homeBudget.repository.RoleRepository;
import homeBudget.repository.UserCustomDetailsRepository;
import homeBudget.repository.UserPhotoRepository;
import homeBudget.repository.UserRepository;
import homeBudget.security.jwt.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashSet;
import java.util.Set;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthRestAPIs {

    private AuthenticationManager authenticationManager;
    private UserRepository userRepository;
    private UserCustomDetailsRepository userCustomDetailsRepository;
    private UserPhotoRepository userPhotoRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder encoder;
    private JwtProvider jwtProvider;

    @Autowired
    public AuthRestAPIs(AuthenticationManager authenticationManager, UserRepository userRepository,
                        UserCustomDetailsRepository userCustomDetailsRepository,
                        UserPhotoRepository userPhotoRepository, RoleRepository roleRepository,
                        PasswordEncoder encoder, JwtProvider jwtProvider) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.userCustomDetailsRepository = userCustomDetailsRepository;
        this.userPhotoRepository = userPhotoRepository;
        this.roleRepository = roleRepository;
        this.encoder = encoder;
        this.jwtProvider = jwtProvider;
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginForm loginRequest) {

        if (!existUsername(loginRequest.getUsername()) ||
                !matchPassword(loginRequest.getPassword(), loginRequest.getUsername())) {
            return new ResponseEntity<>(new ResponseMessage("Fail -> Invalid username or password!"),
                    HttpStatus.BAD_REQUEST);
        }
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtProvider.generateJwtToken(authentication);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findUserByUsername(loginRequest.getUsername());

        return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getUsername(), userDetails.getAuthorities(), Long.toString(user.getId())));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpForm signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return new ResponseEntity<>(new ResponseMessage("Fail -> Username is already taken!"),
                    HttpStatus.BAD_REQUEST);
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return new ResponseEntity<>(new ResponseMessage("Fail -> Email is already taken!"),
                    HttpStatus.BAD_REQUEST);
        }

        // Creating user's account
        User user = new User(signUpRequest.getName(), signUpRequest.getUsername(), signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));

        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();

        strRoles.forEach(role -> {
            switch (role) {
                case "admin":
                    Role adminRole = roleRepository.findByName(RoleName.ROLE_ADMIN)
                            .orElseThrow(() -> new RuntimeException("Fail! -> Cause: Admin Role not find"));
                    roles.add(adminRole);
                    break;
                case "pm":
                    Role pmRole = roleRepository.findByName(RoleName.ROLE_PM)
                            .orElseThrow(() -> new RuntimeException("Fail! -> Cause: PM Role not find"));
                    roles.add(pmRole);
                    break;
                default:
                    Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                            .orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not find"));
                    roles.add(userRole);
            }
        });

        user.setRoles(roles);
        user.setActive(true);
        userRepository.save(user);

        //Create User custom details
        UserCustomDetails userCustomDetails = new UserCustomDetails();
        userCustomDetails.setUser(user);
        userCustomDetailsRepository.save(userCustomDetails);

        //Create default user photo
        try {
            String defaultPhoto = "static/photo/default-user-image.png";
            File image = ResourceUtils.getFile("classpath:"+defaultPhoto);
            byte[] content = null;
            UserPhoto userPhoto = new UserPhoto();

            Path path = Paths.get(image.getAbsolutePath());
            content = Files.readAllBytes(path);

            userPhoto.setName(image.getName());
            userPhoto.setType("image/png");
            userPhoto.setPic(content);
            userPhoto.setUser(user);

            userPhotoRepository.save(userPhoto);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>(new ResponseMessage("User registered successfully!"), HttpStatus.OK);
    }

    private boolean existUsername (String username) {
        return userRepository.existsByUsername(username);
    }

    private boolean matchPassword (String password, String username) {
        return encoder.matches(password,
                userRepository.getPasswordByUsername(username).getPassword());
    }
}
