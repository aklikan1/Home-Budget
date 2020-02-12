package homeBudget.controller.listeners;

import homeBudget.model.User;
import homeBudget.model.UserPhoto;

import javax.persistence.PostUpdate;

public class UserPhotoListener extends DatabaseListener{

    @Override
    @PostUpdate
    public void onPostUpdate(Object object) {
        UserPhoto photo = (UserPhoto) object;
        User user = photo.getUser();

        String descriptions = "A user: \""+user.getUsername()+"\" has changed photo";

        DatabaseListener.createOwnHistoryPoint(descriptions, user, null);
    }
}
