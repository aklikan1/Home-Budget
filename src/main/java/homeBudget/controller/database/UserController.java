package homeBudget.controller.database;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import homeBudget.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import homeBudget.model.User;
import homeBudget.repository.UserRepository;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/user")
public class UserController {
	
	private UserRepository userRepository;
	private UserService userService;

	@Autowired
	public UserController (UserRepository userRepository, UserService userService) {
		this.userRepository = userRepository;
		this.userService = userService;
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
		User userWithDefaultRole = userService.addWithDefaultRole(user);
		User save = userRepository.save(userWithDefaultRole);
		URI location = ServletUriComponentsBuilder
				.fromCurrentRequest()
				.path("{id}")
				.buildAndExpand(save.getId())
				.toUri();
		return ResponseEntity.created(location).body(save);
	}
}
