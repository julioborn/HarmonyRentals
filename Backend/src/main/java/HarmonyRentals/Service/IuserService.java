package HarmonyRentals.Service;

import com.amazonaws.services.cognitoidp.model.SignUpRequest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface IuserService extends UserDetailsService {
    UserDetails createUser(SignUpRequest signUpRequest);
}
