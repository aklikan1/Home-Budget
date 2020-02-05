package homeBudget.controller.database;

import homeBudget.model.User;
import homeBudget.model.UserPhoto;
import homeBudget.repository.UserPhotoRepository;
import homeBudget.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/photo")
public class UserPhotoController {

    UserPhotoRepository userPhotoRepository;
    UserRepository userRepository;

    @Autowired
    public UserPhotoController(UserPhotoRepository userPhotoRepository, UserRepository userRepository) {
        this.userPhotoRepository = userPhotoRepository;
        this.userRepository = userRepository;
    }

    @GetMapping(path = {"/{id}"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserPhoto> getUserPhotoByUserId (@PathVariable Long id) {
        User user = userRepository.findById(id).get();
        UserPhoto userPhoto = new UserPhoto();
        byte[] content = null;

        if (userPhotoRepository.existsById(id)) {
            userPhoto = userPhotoRepository.findById(id).get();

        } else {
            try {
                String defaultPhoto = "static/photo/default-user-image.png";
                File image = ResourceUtils.getFile("classpath:"+defaultPhoto);

                Path path = Paths.get(image.getAbsolutePath());
                content = Files.readAllBytes(path);

                //userPhoto.setId(user.getId());
                userPhoto.setName(image.getName());
                userPhoto.setType("image/png");
                userPhoto.setPic(content);
                userPhoto.setUser(user);

                userPhotoRepository.save(userPhoto);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return ResponseEntity.ok(userPhoto);
    }

    @PostMapping(path = "/upload", produces = MediaType.APPLICATION_JSON_VALUE, consumes = {"multipart/form-data"} )
    public ResponseEntity<?> saveUserPhoto (
            @RequestPart("properties") Map<String, String> userId,
            @RequestPart("myFile") MultipartFile file) throws IOException {

        User user = userRepository.findById(Long.valueOf(userId.get("userId"))).get();
        UserPhoto img = new UserPhoto(file.getOriginalFilename(), file.getContentType(), file.getBytes(), user);

        System.out.println(file.getContentType());
        if (userPhotoRepository.existsById(user.getId())) {
            img.setId(user.getId());
        }
        UserPhoto save = userPhotoRepository.save(img);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("{id}")
                .buildAndExpand(save.getId())
                .toUri();


        return ResponseEntity.created(location).body(img);
    }
}
