package HarmonyRentals.Repository;

import HarmonyRentals.Models.Categoria;
import HarmonyRentals.Models.Producto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductoRepository extends
        JpaRepository<Producto, Integer> {

    @Query(value = "SELECT * FROM producto ORDER BY RAND() LIMIT 10", nativeQuery = true)
    List<Producto> getRandomProductos();

    Page<Producto> findAll(Pageable pageable)  ;

    Producto findByNombre(String nombre);
    List<Producto> findByCategoria(Categoria categoria);
}


