package HarmonyRentals.Service;


import HarmonyRentals.Models.Rol;
import HarmonyRentals.Models.Usuario;
import HarmonyRentals.Repository.UsuarioRepository;
import com.amazonaws.services.cognitoidp.model.SignUpRequest;
import lombok.AllArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.ErrorResponseException;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UsuarioService implements IuserService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public List<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> getUsuarioById(Integer id) {
        return usuarioRepository.findById(id);
    }

    public Usuario createUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public Usuario updateUsuario(Integer id, Usuario updatedUsuario) {
        Optional<Usuario> existingUsuario = usuarioRepository.findById(id);
        if (existingUsuario.isPresent()) {
            Usuario usuario = existingUsuario.get();
            usuario.setNombre(updatedUsuario.getNombre());
            usuario.setApellido(updatedUsuario.getApellido());
            usuario.setEmail(updatedUsuario.getEmail());
            usuario.setDni(updatedUsuario.getDni());
            usuario.setDomicilio(updatedUsuario.getDomicilio());
            usuario.setTelefono(updatedUsuario.getTelefono());
            usuario.setRol(updatedUsuario.getRol());
            usuario.setVerificado(updatedUsuario.getVerificado());
            return usuarioRepository.save(usuario);
        } else {
            throw new IllegalArgumentException("Usuario not found with id: " + id);
        }
    }

    public void deleteUsuario(Integer id) {
        usuarioRepository.deleteById(id);
    }

    @Override
    public UserDetails createUser(SignUpRequest signUpRequest) {
        try{
            return usuarioRepository.save(Usuario.builder()
                    .nombre(signUpRequest.getUsername())
                    .password(passwordEncoder.encode(signUpRequest.getPassword()))
                    .rol(new Rol()).build());
        }catch (DataIntegrityViolationException e){
            throw new ErrorResponseException(HttpStatus.CONFLICT,
                    ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT,
                            "User already exist"),e);
        }
    }

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        return null;
    }
}
