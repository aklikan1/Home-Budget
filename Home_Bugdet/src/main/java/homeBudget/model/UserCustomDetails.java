package homeBudget.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Data
@AllArgsConstructor
public class UserCustomDetails {

    @Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName = "";

    private String lastName = "";

    private String address = "";

    private String city = "";

    private String country = "";

    private String zipCode = "";

    private String aboutMe = "";

    @Column(length = 10000)
    private String photoDescriptions = "";

    private String job = "";

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "user")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User user;
}
