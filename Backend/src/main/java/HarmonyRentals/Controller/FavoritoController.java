package HarmonyRentals.Controller;

import HarmonyRentals.Models.Favorito;
import HarmonyRentals.Models.Producto;
import HarmonyRentals.Models.Usuario;
import HarmonyRentals.Service.FavoritoService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

import static HarmonyRentals.HarmonyRentalsApp.endpoint;

@RestController
@RequestMapping("/favoritos")
public class FavoritoController {
    @Autowired
    private FavoritoService favoritoService;
    @CrossOrigin(origins =  endpoint)
    @PostMapping("/agregar")
    public Favorito agregarFavorito(
            @RequestParam ("producto_id") Integer producto,
            @RequestParam ("usuario_id") Integer usuario) {
        return favoritoService.agregarFavorito(usuario, producto);
    }
    @CrossOrigin(origins =  endpoint)
    @GetMapping("/{usuarioId}")
    public Set<Favorito> listarFavoritosPorUsuario(@PathVariable("usuarioId") Integer usuarioId) {
        Usuario usuario = new Usuario();
        usuario.setId(usuarioId);
        return favoritoService.listarFavoritosPorUsuario(usuario);
    }

    @CrossOrigin(origins =  endpoint)
    @GetMapping("/producto/{productoId}")
    public Favorito obtenerFavoritoPorProducto(@PathVariable("productoId") Integer productoId) {
        Producto producto = new Producto();
        producto.setId(productoId);
        return favoritoService.obtenerFavoritoPorProducto(producto);
    }

    @Transactional
    @CrossOrigin(origins = endpoint)
    @DeleteMapping("/eliminar/{productoId}")
    public void eliminarFavorito(@PathVariable("productoId") Integer productoId) {
        favoritoService.eliminarFavoritoPorProducto(productoId);
    }

    @Transactional
    @CrossOrigin(origins =  endpoint)
    @DeleteMapping("/eliminar-favoritos/{usuarioId}")
    public void eliminarTodosLosFavoritosPorUsuario(@PathVariable("usuarioId") Integer usuarioId) {
        favoritoService.eliminarTodosLosFavoritosPorUsuario(usuarioId);
    }

    @CrossOrigin(origins = endpoint)
    @GetMapping("/{usuarioId}/producto/{productoId}")
    public Favorito obtenerFavoritoPorUsuarioYProducto(
            @PathVariable("usuarioId") Integer usuarioId,
            @PathVariable("productoId") Integer productoId
    ) {
        Usuario usuario = new Usuario();
        usuario.setId(usuarioId);
        Producto producto = new Producto();
        producto.setId(productoId);
        return favoritoService.obtenerFavoritoPorUsuarioYProducto(usuario, producto);
    }



}
