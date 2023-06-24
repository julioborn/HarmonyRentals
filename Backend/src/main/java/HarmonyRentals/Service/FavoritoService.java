package HarmonyRentals.Service;

import HarmonyRentals.Models.Favorito;
import HarmonyRentals.Models.Producto;
import HarmonyRentals.Models.Usuario;
import HarmonyRentals.Repository.FavoritoRepository;
import HarmonyRentals.Repository.ProductoRepository;
import HarmonyRentals.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;
import java.util.Set;
@Service
public class FavoritoService {
    @Autowired
    private FavoritoRepository favoritoRepository;
    private final UsuarioRepository usuarioRepository;
    private final ProductoRepository productoRepository;

    public FavoritoService(UsuarioRepository usuarioRepository, ProductoRepository productoRepository) {
        this.usuarioRepository = usuarioRepository;
        this.productoRepository = productoRepository;
    }
    public Favorito agregarFavorito(Integer usuario, Integer producto) {
        Favorito favorito = new Favorito();
        favorito.setUsuario(usuarioRepository.getReferenceById(usuario));
        favorito.setProducto(productoRepository.getReferenceById(producto));
        return favoritoRepository.save(favorito);
    }
    public Set<Favorito> listarFavoritosPorUsuario(Usuario usuario) {
        return favoritoRepository.findByUsuario(usuario);
    }
    /*public List<Favorito> listarFavoritosPorUsuario(Usuario usuario) {
        return favoritoRepository.findByUsuario(usuario);
    }*/
    public Favorito obtenerFavoritoPorProducto(Producto producto) {
        // Lógica para obtener el favorito por producto
        return favoritoRepository.findByProducto(producto);
    }
    /*public void eliminarTodosLosFavoritosPorUsuario(Integer usuarioId) {
        favoritoRepository.deleteAllById(Collections.singleton(usuarioId));
    }*/
    public void eliminarFavoritoPorProducto(Integer productoId) {
        Producto producto = new Producto();
        producto.setId(productoId);
        favoritoRepository.deleteByProducto(producto);
    }
    /*public void eliminarTodosLosFavoritos() {
        favoritoRepository.deleteAll();
    }*/
    public void eliminarTodosLosFavoritosPorUsuario(Integer usuarioId) {
        Usuario usuario = new Usuario();
        usuario.setId(usuarioId);
        favoritoRepository.deleteAllByUsuario(usuario);
    }
    public boolean esProductoFavorito(Producto producto) {
        Favorito favorito = favoritoRepository.findByProducto(producto);
        return favorito != null;
    }
    public Favorito obtenerFavoritoPorUsuarioYProducto(Usuario usuario, Producto producto) {
        return favoritoRepository.findByUsuarioAndProducto(usuario, producto);
    }
}
