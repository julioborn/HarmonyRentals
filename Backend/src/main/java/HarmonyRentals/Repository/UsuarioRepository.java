package HarmonyRentals.Repository;

import HarmonyRentals.Models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    Usuario findByNombre(String nombre);
    Usuario findByEmail (String email);

    boolean existsByEmail(String email);

}

