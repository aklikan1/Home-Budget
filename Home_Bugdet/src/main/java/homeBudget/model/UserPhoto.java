package homeBudget.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import homeBudget.controller.listeners.UserPhotoListener;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "user_photo")
@AllArgsConstructor
@Data
@NoArgsConstructor
@ToString
@EntityListeners(UserPhotoListener.class)
public class UserPhoto {

   @Id
   //@GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long id;

   private String name;

   private String type;

   @Lob
   private byte[] pic;

   @OneToOne(fetch = FetchType.LAZY)
   @MapsId
   @JoinColumn(name = "user")
   @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
   private User user;

   public UserPhoto(String name, String type, byte[] pic,  User user) {
       this.name = name;
       this.type = type;
       this.pic = pic;
       this.user = user;
   }
}
