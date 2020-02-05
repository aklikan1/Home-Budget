package homeBudget.controller.viewModel;

import homeBudget.model.User;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

@Getter
public class PhotoFile {

    private User user;

    private MultipartFile file;

}
