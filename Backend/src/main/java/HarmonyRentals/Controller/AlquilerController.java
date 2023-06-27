package HarmonyRentals.Controller;

import HarmonyRentals.Models.Alquiler;
import HarmonyRentals.Models.AlquilerDTO;
import HarmonyRentals.Models.FechaReservada;
import HarmonyRentals.Models.Producto;
import HarmonyRentals.Service.AlquilerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;

import static HarmonyRentals.HarmonyRentalsApp.endpoint;

@RestController
@RequestMapping("/alquiler")
public class AlquilerController {
    private final AlquilerService alquilerService;

    @Autowired
    public AlquilerController(AlquilerService alquilerService) {
        this.alquilerService = alquilerService;
    }
    @CrossOrigin(origins = endpoint)
    @GetMapping("/todos")
    public List<Alquiler> getAllAlquileres() {
        return alquilerService.findAll();
    }
    @CrossOrigin(origins = endpoint)
    @GetMapping("/usuario/{usuarioId}")
    public List<Alquiler> getAlquileresByUsuarioId(@PathVariable Integer usuarioId) {
        return alquilerService.getAlquileresByUsuarioId(usuarioId);
    }
    @CrossOrigin(origins = endpoint)
    @GetMapping("/productosDisponibles")
   public List<Producto> getProductosNotInAlquilerByFechaBetween(@RequestParam("fecha_desde") Date fecha_desde,
                                                                 @RequestParam("fecha_hasta") Date fecha_hasta) {
        return alquilerService.findProductosNotInAlquilerByFechaBetween(fecha_desde, fecha_hasta);
    }
    @CrossOrigin(origins = endpoint)
    @GetMapping("/producto/{producto_id}/fechas")
    public List<FechaReservada> getDateSpansByProductoId(@PathVariable Integer producto_id) {
        return alquilerService.findFechasReservadasById(producto_id);
    }
    @CrossOrigin(origins = endpoint)
    @PostMapping ("/agregar")
    @ResponseStatus(HttpStatus.CREATED)
    public Alquiler agregarAlquiler(@RequestBody AlquilerDTO alquilerDTO) {
        return alquilerService.agregarAlquiler(alquilerDTO);
    }

    @CrossOrigin(origins = endpoint)
    @DeleteMapping("/{alquiler_id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminarAlquiler(@PathVariable Integer alquiler_id) {
        alquilerService.deleteById(alquiler_id);
    }
    @CrossOrigin(origins = endpoint)
    @PutMapping("/{alquiler_id}")
    public Alquiler modificarAlquiler(@PathVariable("alquiler_id") Integer alquilerId, @RequestBody AlquilerDTO alquilerDTO) {
        return alquilerService.modificarAlquiler(alquilerId, alquilerDTO);
    }
    @CrossOrigin(origins = endpoint)
    @GetMapping("/productosDisponiblesXfecha")
    public List<Producto> getProductosDisponibles(
            @RequestParam("query") String query,
            @RequestParam("fecha_desde")  Date fecha_desde,
            @RequestParam("fecha_hasta")  Date fecha_hasta
            ) {
        return alquilerService.getProductosNoEnAlquilerPorFechaEntreYNombre(
                 query, fecha_desde, fecha_hasta);
    }
}
