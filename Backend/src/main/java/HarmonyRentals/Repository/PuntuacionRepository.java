package HarmonyRentals.Repository;

import HarmonyRentals.Models.Puntuacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PuntuacionRepository extends JpaRepository<Puntuacion, Integer> {

    @Query(value = "SELECT ROUND(AVG(puntaje),1) FROM puntuacion WHERE producto_id = :producto_id", nativeQuery = true)
    Double getPuntaje(@Param ("producto_id") Integer producto_id);

    @Query(value = "SELECT COALESCE(puntaje, 0) FROM puntuacion WHERE usuario_id = :usuario_id AND producto_id = :producto_id", nativeQuery = true)
    Integer getPuntuacionByUsuarioAndProducto(@Param("usuario_id") Integer usuario_id, @Param("producto_id") Integer producto_id);

}
