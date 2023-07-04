package HarmonyRentals.Repository;


import HarmonyRentals.Models.Alquiler;
import HarmonyRentals.Models.FechaReservada;
import HarmonyRentals.Models.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface AlquilerRepository extends JpaRepository<Alquiler, Integer> {





    List<Alquiler> findAll();

    void deleteById(Integer id);

    Optional<Alquiler> findById(Integer id);
    List<Alquiler> getByUsuario_id(Integer usuario_id);

    //método para obtener todos los id de productos no incluidos en ningun alquiler entre dos fechas
    //    @Query("SELECT p FROM Producto p WHERE p.id NOT IN (SELECT DISTINCT a.producto.id FROM Alquiler a WHERE a.fecha_desde >= :fecha_desde AND a.fecha_hasta <= :fecha_hasta)AND lower(p.nombre) LIKE lower(concat('%', :query, '%'))")
   // List<Producto> findProductosNotInAlquilerByFechaBetween(@Param("fecha_desde") Date fecha_desde, @Param("fecha_hasta") Date fecha_hasta);



    @Query("SELECT p FROM Producto p WHERE p.id NOT IN (SELECT DISTINCT a.producto.id FROM Alquiler a WHERE a.fecha_hasta >= :fecha_desde AND a.fecha_desde <= :fecha_hasta) AND lower(p.nombre) LIKE lower(concat('%', :query, '%'))")
    List<Producto> findProductosNotInAlquilerByFechaBetween(@Param("fecha_desde") Date fecha_desde, @Param("fecha_hasta") Date fecha_hasta);





    //método para obtener todos los span de fechas alquiladas para un producto
    @Query("SELECT DISTINCT CONCAT(a.fecha_desde, '-', a.fecha_hasta) FROM Alquiler a WHERE a.producto.id = :producto_id")
    List<String> findDateSpansByProducto_id(@Param("producto_id") Integer producto_id);

    @Query("SELECT a FROM Alquiler a WHERE a.producto.id = :productId")
    List<Alquiler> findAlquilerByProductId(@Param("productId") Integer productId);


    List<FechaReservada> findFechasReservadasById(Integer productoId);

}

