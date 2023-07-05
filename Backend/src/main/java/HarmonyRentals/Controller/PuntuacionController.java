package HarmonyRentals.Controller;

import HarmonyRentals.Models.Puntuacion;
import HarmonyRentals.Models.PuntuacionDTO;
import HarmonyRentals.Repository.ProductoRepository;
import HarmonyRentals.Repository.PuntuacionRepository;
import HarmonyRentals.Repository.UsuarioRepository;
import HarmonyRentals.Service.ProductoService;
import HarmonyRentals.Service.PuntuacionService;
import HarmonyRentals.Service.UsuarioService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

import static HarmonyRentals.HarmonyRentalsApp.endpoint;

@RestController
@RequestMapping("/puntuacion")
public class PuntuacionController {

    private final ProductoRepository productoRepository;
    private final PuntuacionService puntuacionService;
    private final PuntuacionRepository puntuacionRepository;

    private final UsuarioRepository usuarioRepository;

    @Autowired
    ObjectMapper mapper;
    @Autowired
    public PuntuacionController(PuntuacionService puntuacionService, ProductoService productoService, UsuarioService usuarioService, PuntuacionRepository puntuacionRepository, ProductoRepository productoRepository, UsuarioRepository usuarioRepository) {
        this.puntuacionService = puntuacionService;
        this.puntuacionRepository = puntuacionRepository;
        this.productoRepository = productoRepository;
        this.usuarioRepository = usuarioRepository;

    }
    @CrossOrigin(origins = endpoint )
    @GetMapping("/chequearPuntuacion")
    public ResponseEntity<Integer> getPuntuacionByUsuarioAndProducto(
            @RequestParam("usuario_id") Integer usuario_id,
            @RequestParam("producto_id") Integer producto_id) {
        Integer puntuacion = puntuacionService.getPuntuacionByUsuarioAndProducto(usuario_id, producto_id);
        return ResponseEntity.ok(puntuacion);
    }


    @CrossOrigin(origins = endpoint )
    @GetMapping("/producto")
    public ResponseEntity <Map<String, Object> > getPuntaje(@RequestParam("producto_id") Integer producto_id) {
        Puntuacion puntuacion = new Puntuacion();
        puntuacion.getPuntaje(producto_id);
        Double puntaje = puntuacionService.getPuntaje(producto_id);
        Map<String, Object> response = new HashMap<>();
        response.put("puntaje", puntaje);
        return ResponseEntity.ok(response);
    }

    @CrossOrigin(origins = endpoint)
    @PostMapping("/agregar")
    public ResponseEntity<?> agregarPuntuacion(@RequestBody PuntuacionDTO puntuacionDTO) {
        Integer puntuacion = puntuacionService.getPuntuacionByUsuarioAndProducto(puntuacionDTO.getUsuario_id(), puntuacionDTO.getProducto_id());

        if (puntuacion == null || puntuacion == 0) {
            return puntuacionService.agregarPuntuacion(puntuacionDTO);
        } else {
            String mensaje = "Tu puntuación fue: " + puntuacion;
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(mensaje);
        }
    }
}
