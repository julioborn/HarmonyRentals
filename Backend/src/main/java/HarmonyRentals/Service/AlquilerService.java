package HarmonyRentals.Service;

import HarmonyRentals.Exceptions.RentalDateConflictException;
import HarmonyRentals.Models.*;
import HarmonyRentals.Repository.AlquilerRepository;
import HarmonyRentals.Repository.ProductoRepository;
import HarmonyRentals.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@Service
public class AlquilerService {
    private final AlquilerRepository alquilerRepository;
    private final UsuarioRepository usuarioRepository;
    private final ProductoRepository productoRepository;

    @Autowired
    public AlquilerService(AlquilerRepository alquilerRepository, UsuarioRepository usuarioRepository, ProductoRepository productoRepository) {
        this.alquilerRepository = alquilerRepository;
        this.usuarioRepository = usuarioRepository;
        this.productoRepository = productoRepository;
    }

    public List<Alquiler> findAll() {
        return alquilerRepository.findAll();
    }

    public List<Alquiler> getAlquileresByUsuarioId(Integer usuario_id) {
        return alquilerRepository.getByUsuario_id(usuario_id);
    }

    public List<Producto> findProductosNotInAlquilerByFechaBetween(Date fecha_desde, Date fecha_hasta) {
       return alquilerRepository.findProductosNotInAlquilerByFechaBetween(fecha_desde, fecha_hasta);
    }

    public List<String> getDateSpansByProducto_id(Integer producto_id) {
        return alquilerRepository.findDateSpansByProducto_id(producto_id);
    }

    public Alquiler agregarAlquiler(AlquilerDTO alquilerDTO) {
        Optional<Usuario> usuarioOptional = usuarioRepository.findById(alquilerDTO.getUsuario_id());
        Optional<Producto> productoOptional = productoRepository.findById(alquilerDTO.getProducto_id());

        if (usuarioOptional.isEmpty()) {
            throw new UsuarioNotFoundException("Usuario no encontrado");
        }

        if (productoOptional.isEmpty()) {
            throw new ProductoNotFoundException("Producto no encontrado");
        }
        Usuario usuario = usuarioOptional.get();
        Producto producto = productoOptional.get();
        // Retrieve existing rentals for the product
        List<Alquiler> existingRentals = alquilerRepository.findAlquilerByProductId(alquilerDTO.getProducto_id());
        // Check for conflicts with existing rentals
        for (Alquiler existingRental : existingRentals) {
            LocalDate existingFechaDesde = existingRental.getFecha_desde().toLocalDate();
            LocalDate existingFechaHasta = existingRental.getFecha_hasta().toLocalDate();
            LocalDate newFechaDesde = alquilerDTO.getFecha_desde().toLocalDate();
            LocalDate newFechaHasta = alquilerDTO.getFecha_hasta().toLocalDate();
            if (existingFechaDesde.isBefore(newFechaHasta) && existingFechaHasta.isAfter(newFechaDesde)) {
                throw new RentalDateConflictException("El período seleccionado contiene fechas no disponbles");
            }
        }
        Alquiler alquiler = new Alquiler();
        alquiler.setUsuario(usuario);
        alquiler.setProducto(producto);
        alquiler.setFecha_desde(alquilerDTO.getFecha_desde());
        alquiler.setFecha_hasta(alquilerDTO.getFecha_hasta());
        alquiler.setValor(alquilerDTO.getValor());
        return alquilerRepository.save(alquiler);
    }


    public void deleteById(Integer id) {
        Optional<Alquiler> alquilerOptional = alquilerRepository.findById(id);

        if (alquilerOptional.isEmpty()) {
            throw new AlquilerNotFoundException("Alquiler not found");
        }

        alquilerRepository.delete(alquilerOptional.get());
    }

    public Optional<Alquiler> findById(Integer id) {
        return alquilerRepository.findById(id);
    }

    public Alquiler modificarAlquiler(Integer alquiler_id, AlquilerDTO alquilerDTO) {
        Optional<Alquiler> alquilerOptional = alquilerRepository.findById(alquiler_id);
        Optional<Usuario> usuarioOptional = usuarioRepository.findById(alquilerDTO.getUsuario_id());
        Optional<Producto> productoOptional = productoRepository.findById(alquilerDTO.getProducto_id());

        if (alquilerOptional.isEmpty()) {
            throw new AlquilerNotFoundException("Alquiler not found");
        }

        if (usuarioOptional.isEmpty()) {
            throw new UsuarioNotFoundException("Usuario not found");
        }

        if (productoOptional.isEmpty()) {
            throw new ProductoNotFoundException("Producto not found");
        }

        Usuario usuario = usuarioOptional.get();
        Producto producto = productoOptional.get();
        Alquiler alquiler = alquilerOptional.get();

        alquiler.setUsuario(usuario);
        alquiler.setProducto(producto);
        alquiler.setFecha_desde(alquilerDTO.getFecha_desde());
        alquiler.setFecha_hasta(alquilerDTO.getFecha_hasta());
        alquiler.setValor(alquilerDTO.getValor());

        return alquilerRepository.save(alquiler);
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    public static class UsuarioNotFoundException extends RuntimeException {
        public UsuarioNotFoundException(String message) {
            super(message);
        }
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    public static class ProductoNotFoundException extends RuntimeException {
        public ProductoNotFoundException(String message) {
            super(message);
        }
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    public static class AlquilerNotFoundException extends RuntimeException {
        public AlquilerNotFoundException(String message) {
            super(message);
        }
    }

    public List<Producto> getProductosNoEnAlquilerPorFechaEntreYNombre(
             String query, Date fecha_desde, Date fecha_hasta) {
        return productoRepository.buscarProductosNoEnAlquilerPorFechaEntreYNombreConteniendoIgnorarCaso(
                 query, fecha_desde, fecha_hasta);
    }

    public List<Alquiler> getAlquilerByProductId(Integer productId) {
        return alquilerRepository.findAlquilerByProductId(productId);
    }
    public List<FechaReservada> findFechasReservadasById(Integer productoId) {
        List<Alquiler> alquileres = alquilerRepository.findAlquilerByProductId(productoId);
        List<FechaReservada> fechasReservadas = new ArrayList<>();

        for (Alquiler alquiler : alquileres) {
            FechaReservada fechaReservada = new FechaReservada();
            fechaReservada.setFecha_desde(alquiler.getFecha_desde());
            fechaReservada.setFecha_hasta(alquiler.getFecha_hasta());
            fechasReservadas.add(fechaReservada);
        }

        return fechasReservadas;
    }

}
