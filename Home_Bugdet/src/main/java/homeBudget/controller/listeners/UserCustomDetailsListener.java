package homeBudget.controller.listeners;

import homeBudget.model.User;
import homeBudget.model.UserCustomDetails;

import javax.persistence.PostUpdate;

public class UserCustomDetailsListener extends DatabaseListener {

    @Override
    @PostUpdate
    public void onPostUpdate(Object object) {
        UserCustomDetails customDetails = (UserCustomDetails) object;
        User user = customDetails.getUser();

        String descriptions = "A user: \""+user.getUsername()+"\" has changed profile";

        DatabaseListener.createOwnHistoryPoint(descriptions, user, null);
    }
}
