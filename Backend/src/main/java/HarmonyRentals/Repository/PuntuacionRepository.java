package HarmonyRentals.Repository;

import HarmonyRentals.Models.Puntuacion;
import HarmonyRentals.Models.Producto;
import HarmonyRentals.Models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

@Repository
public interface PuntuacionRepository extends JpaRepository<Puntuacion, Integer> {

    @Query(value = "SELECT ROUND(AVG(puntaje),1) FROM puntuacion WHERE producto_id = :producto_id", nativeQuery = true)
    Double getPuntaje(@Param ("producto_id") Integer producto_id);

}
