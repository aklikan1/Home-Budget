package homeBudget.controller;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import homeBudget.model.User;
import homeBudget.repository.UserRepository;

@RestController
@RequestMapping("/api/user")
public class UserController {
	
	private UserRepository userRepository;

	@Autowired
	public UserController (UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@GetMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<User> getUserByIdCtrl (@PathVariable Long id) {
		User user = userRepository.findById(id).get();
		return  ResponseEntity.ok(user);
	}
}
