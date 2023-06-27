package HarmonyRentals.Repository;

import HarmonyRentals.Models.Categoria;
import HarmonyRentals.Models.Producto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Date;
import java.util.List;

public interface ProductoRepository extends
        JpaRepository<Producto, Integer> {

    @Query(value = "SELECT * FROM producto ORDER BY RAND() LIMIT 10", nativeQuery = true)
    List<Producto> getRandomProductos();

    Page<Producto> findAll(Pageable pageable)  ;

    Producto findByNombre(String nombre);
    List<Producto> findByCategoria(Categoria categoria);

    List<Producto> findByNombreContainingIgnoreCase(String query);
    //método para obtener productos según búsqueda, disponibles para una fecha
    @Query("SELECT p FROM Producto p WHERE p.id NOT IN (SELECT DISTINCT a.producto.id FROM Alquiler a WHERE a.fecha_desde >= :fecha_desde AND a.fecha_hasta <= :fecha_hasta) AND lower(p.nombre) LIKE lower(concat('%', :query, '%'))")
    List<Producto> buscarProductosNoEnAlquilerPorFechaEntreYNombreConteniendoIgnorarCaso(
            @Param("query") String query,
            @Param("fecha_desde") Date fecha_desde,
            @Param("fecha_hasta") Date fecha_hasta
            );


}


