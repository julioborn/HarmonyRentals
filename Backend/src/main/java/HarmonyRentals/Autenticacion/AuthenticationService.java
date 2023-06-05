package HarmonyRentals.Autenticacion;

import HarmonyRentals.Models.Rol;
import HarmonyRentals.Models.Usuario;
import HarmonyRentals.Repository.RolRepository;
import HarmonyRentals.Repository.UsuarioRepository;
import HarmonyRentals.Service.MailService;
import HarmonyRentals.Config.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UsuarioRepository usuarioRepository;
    private final RolRepository rolRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final MailService mailService;

    public AuthenticationResponse register(RegisterRequest request) {
        validateEmailUniqueness(request.getEmail());

        Rol userRole = rolRepository.findRolByNombre("usuario");
        Usuario usuario = Usuario.builder()
                .nombre(request.getNombre())
                .apellido(request.getApellido())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .rol(userRole)
                .verificado(0)
                .build();

        usuarioRepository.save(usuario);
        String jwtToken = jwtService.generateToken(usuario);
        String validationLink = "http://localhost:8080/verificar?token=" + jwtToken; // Updated validation link
        String emailBody = "Gracias por registrarte. Haz clic en el siguiente enlace para validar tu cuenta:<br><br>"
                + "<a href=\"" + validationLink + "\">Validar cuenta</a>";
        mailService.sendMail(request.getEmail(), "Bienvenido/a a nuestra aplicación", emailBody);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }


    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        Usuario usuario = usuarioRepository.findByEmail(request.getEmail());


        if (!passwordEncoder.matches(request.getPassword(), usuario.getPassword())) {
            throw new BadCredentialsException("Invalid email or password");
        }

        String jwtToken = jwtService.generateToken(usuario);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    private void validateEmailUniqueness(String email) {
        if (usuarioRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email is already registered");
        }
    }
}