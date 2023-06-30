package HarmonyRentals.Service;

import HarmonyRentals.Models.Producto;
import HarmonyRentals.Models.Puntuacion;
import HarmonyRentals.Models.PuntuacionDTO;
import HarmonyRentals.Models.Usuario;
import HarmonyRentals.Repository.ProductoRepository;
import HarmonyRentals.Repository.PuntuacionRepository;
import HarmonyRentals.Repository.UsuarioRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class PuntuacionService {

    private final PuntuacionRepository puntuacionRepository;

    private final ProductoRepository productoRepository;

    private final UsuarioRepository usuarioRepository;

    private final ObjectMapper mapper;


    @Autowired
    public PuntuacionService(PuntuacionRepository puntuacionRepository, ProductoRepository productoRepository, UsuarioRepository usuarioRepository, ObjectMapper mapper) {
        this.puntuacionRepository = puntuacionRepository;
        this.productoRepository = productoRepository;
        this.usuarioRepository = usuarioRepository;
        this.mapper = mapper;
    }

    public Double getPuntaje(Integer id) { return puntuacionRepository.getPuntaje(id); };



    public ResponseEntity<?> agregarPuntuacion(PuntuacionDTO puntuacionDTO) {
        Integer usuarioId = puntuacionDTO.getUsuario_id();
        Integer productoId = puntuacionDTO.getProducto_id();
        Usuario usuario = usuarioRepository.getReferenceById(usuarioId); // Replace `usuarioService` with the actual service class for fetching users
        Producto producto = productoRepository.getReferenceById(productoId); // Replace `productoService` with the actual service class for fetching products
        if (usuario == null || producto == null) {
            // Handle the case when the specified usuario_id or producto_id is invalid
            return ResponseEntity.badRequest().build();
        }
        Puntuacion puntuacion = new Puntuacion(usuario, producto, puntuacionDTO.getPuntaje());
        puntuacionRepository.save(puntuacion);
        System.out.println("se creo la puntuacion");
        // Return a success response
        return ResponseEntity.ok().build();
    }
    public Integer getPuntuacionByUsuarioAndProducto(Integer usuarioId, Integer productoId) {
        Integer puntuacion = puntuacionRepository.getPuntuacionByUsuarioAndProducto(usuarioId, productoId);
        System.out.println(puntuacion);
        return puntuacion != null ? puntuacion : 0;
    }

}