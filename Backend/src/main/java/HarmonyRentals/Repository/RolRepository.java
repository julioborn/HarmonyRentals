package HarmonyRentals.Repository;

import HarmonyRentals.Models.Rol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RolRepository extends JpaRepository<Rol, Integer> {
    String findRolNombreById(Integer id);
    Rol findRolByNombre(String nombre);
    Integer findIdByNombre(String nombre);
}
