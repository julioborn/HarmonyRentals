package HarmonyRentals.Repository;

import HarmonyRentals.Models.Favorito;
import HarmonyRentals.Models.Producto;
import HarmonyRentals.Models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface FavoritoRepository extends JpaRepository<Favorito, Integer> {
    Set<Favorito> findByUsuario(Usuario usuario);
    //List<Favorito> findByUsuario(Usuario usuario);

    Favorito findByProducto(Producto producto);

    void deleteByProducto(Producto producto);

    void deleteAllByUsuario(Usuario usuario);

    Favorito findByUsuarioAndProducto(Usuario usuario, Producto producto);

}
