package homeBudget.controller.database;

import homeBudget.model.User;
import homeBudget.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.security.Principal;

//import homeBudget.service.UserService;

@RestController
@RequestMapping("/api/user")
@CrossOrigin
public class UserController {
	
	private UserRepository userRepository;
	//private UserService userService;

	@Autowired
	public UserController (UserRepository userRepository) {
		this.userRepository = userRepository;
		//this.userService = userService;
	}

	/*
	@GetMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<User> getUserByIdCtrl (@PathVariable Long id) {
		User user = userRepository.findById(id).get();
		return ResponseEntity.ok(user);
	}
	 */

	@GetMapping(path = "/{username}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<User> getUserByUsernameCtrl (@PathVariable String username) {
		User user = userRepository.findUserByUsername(username);
		return ResponseEntity.ok(user);
	}

	@PostMapping(path = "/register", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> saveUser (@RequestBody User user) {
		//User userWithDefaultRole = userService.addWithDefaultRole(user);
		//User save = userRepository.save(userWithDefaultRole);
		User save = userRepository.save(user);
		URI location = ServletUriComponentsBuilder
				.fromCurrentRequest()
				.path("{id}")
				.buildAndExpand(save.getId())
				.toUri();
		return ResponseEntity.created(location).body(save);
	}

	@GetMapping(path = "/userAuth", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Principal> userAuthentication (Principal userPrincipal) {
		return ResponseEntity.ok(userPrincipal);
	}
}
