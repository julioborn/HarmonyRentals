package HarmonyRentals.Autenticacion;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static HarmonyRentals.HarmonyRentalsApp.endpoint;

@RestController
@RequestMapping ("/auth")

public class AuthenticationController {
    private final AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }
    @CrossOrigin(origins = endpoint)
    @PostMapping("/registrar")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @CrossOrigin(origins = endpoint)
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }

}
