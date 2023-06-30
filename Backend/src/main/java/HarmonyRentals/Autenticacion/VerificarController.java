package HarmonyRentals.Autenticacion;

import HarmonyRentals.Config.JwtService;
import HarmonyRentals.Models.Usuario;
import HarmonyRentals.Repository.UsuarioRepository;
import HarmonyRentals.Service.MailService;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import static HarmonyRentals.HarmonyRentalsApp.endpoint;

@Log4j2 // Agregar la anotación log4j2
@RestController
@RequestMapping
public class VerificarController {
    private final UsuarioRepository usuarioRepository;
    private final MailService mailService;
    private final JwtService jwtService;

    @Autowired
    public VerificarController(UsuarioRepository usuarioRepository, MailService mailService, JwtService jwtService) {
        this.usuarioRepository = usuarioRepository;
        this.mailService = mailService;
        this.jwtService = jwtService;
    }

    private static final Logger logger = LogManager.getLogger(VerificarController.class);

    @CrossOrigin(origins = endpoint)
    @GetMapping("/verificar")
    public ResponseEntity<String> validateAccount(@RequestParam("token") String token) {
        logger.info("Validando cuenta con el token: {}", token);

        try {
            // Decodificar y validar el token
            Usuario usuario = usuarioRepository.findByEmail(jwtService.obtenerNombre(token));
            if (usuario == null) {
                // Token inválido
                String errorMessage = "Token inválido";
                logger.warn("Token inválido: {}", token);
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errorMessage);
            }


            usuario.setVerificado(1);
            usuarioRepository.save(usuario);
            logger.info("Cuenta de usuario validada: {}", usuario.getEmail());


            String emailBody = "Tu cuenta ha sido validada exitosamente. ¡Bienvenido/a!";
            mailService.sendMail(usuario.getEmail(), "Confirmación de cuenta", emailBody);
            logger.info("Correo electrónico de confirmación enviado a: {}", usuario.getEmail());


            return ResponseEntity.ok("Cuenta validada exitosamente");
        } catch (ResponseStatusException ex) {
            // Manejar y registrar la excepción ResponseStatusException
            String errorMessage = ex.getReason();
            var status = ex.getStatusCode();
            logger.error(errorMessage, ex);
            throw ex;
        } catch (Exception ex) {

            String errorMessage = "Se produjo un error al validar la cuenta";
            logger.error(errorMessage, ex);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, errorMessage);
        }
    }


    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception ex) {
        String errorMessage = "Se produjo un error inesperado";
        logger.error(errorMessage, ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
    }
}
