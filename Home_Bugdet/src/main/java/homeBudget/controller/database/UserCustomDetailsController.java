package homeBudget.controller.database;

import homeBudget.model.UserCustomDetails;
import homeBudget.repository.UserCustomDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/userDetails")
@CrossOrigin(origins = "http://localhost:4200")
public class UserCustomDetailsController {

    private UserCustomDetailsRepository userCustomDetailsRepository;

    @Autowired
    public UserCustomDetailsController(UserCustomDetailsRepository userCustomDetailsRepository) {
        this.userCustomDetailsRepository = userCustomDetailsRepository;
    }

    @GetMapping(path = "/user/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserCustomDetails> getCustomDetailsByUserId (@PathVariable Long id) {
        UserCustomDetails userCustomDetails = userCustomDetailsRepository.getAllByUserId(id);
        return ResponseEntity.ok(userCustomDetails);
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> saveUserCustomDetail (@RequestBody UserCustomDetails userCustomDetails) {
        UserCustomDetails save = userCustomDetailsRepository.save(userCustomDetails);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("{id}")
                .buildAndExpand(save.getId())
                .toUri();
        return ResponseEntity.created(location).body(save);
    }
}
