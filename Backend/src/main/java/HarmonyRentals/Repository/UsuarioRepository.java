package HarmonyRentals.Repository;

import HarmonyRentals.Models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    Usuario findByNombre(String nombre);
    Usuario findByEmail (String email);

    boolean existsByEmail(String email);
    @Query("from Usuario u where u.nombre =:nombre and u.apellido =:apellido")
    Usuario getFirstByNombreYApellido(@Param("nombre") String nombre, @Param("apellido") String apellido);

}

