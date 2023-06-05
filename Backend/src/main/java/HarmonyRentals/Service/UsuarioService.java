package HarmonyRentals.Service;



import HarmonyRentals.Models.Usuario;
import HarmonyRentals.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    @Autowired
    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

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
            usuario.setPassword(updatedUsuario.getPassword());
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
}
