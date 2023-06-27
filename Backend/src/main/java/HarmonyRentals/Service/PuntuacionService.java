package HarmonyRentals.Service;

import HarmonyRentals.Models.ProductoDTO;
import HarmonyRentals.Models.Puntuacion;
import HarmonyRentals.Models.PuntuacionDTO;
import HarmonyRentals.Repository.ProductoRepository;
import HarmonyRentals.Repository.PuntuacionRepository;
import HarmonyRentals.Repository.UsuarioRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
        Puntuacion puntuacion = mapper.convertValue(puntuacionDTO, Puntuacion.class);
        return ResponseEntity.status(HttpStatus.CREATED).body(puntuacion);
    }
}