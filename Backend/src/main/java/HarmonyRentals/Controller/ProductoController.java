package HarmonyRentals.Controller;

import HarmonyRentals.Models.Categoria;
import HarmonyRentals.Models.Producto;
import HarmonyRentals.Models.ProductoDTO;
import HarmonyRentals.Repository.CategoriaRepository;
import HarmonyRentals.Repository.ProductoRepository;
import HarmonyRentals.Service.CategoriaService;
import HarmonyRentals.Service.ProductoService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static HarmonyRentals.HarmonyRentalsApp.endpoint;

@Log4j2
@RestController
@RequestMapping("/producto")
public class ProductoController {
    private static final Logger logger = LogManager.getLogger(ProductoController.class);
    @Autowired
    private final ProductoRepository productoRepository;
    private final ProductoService productoService;
    private final CategoriaRepository categoriaRepository;
    @Autowired
    ObjectMapper mapper;

    public ProductoController(ProductoService productoService, CategoriaService categoriaService, ProductoRepository productoRepository, CategoriaRepository categoriaRepository) {
        this.productoService = productoService;
        this.productoRepository = productoRepository;
        this.categoriaRepository = categoriaRepository;
    }


    @CrossOrigin(origins =  endpoint)
    @GetMapping("/todos")
    public List<Producto> getProductos() {
        return productoService.getProductos();
    }
    @CrossOrigin(origins =  endpoint)
    @GetMapping("/{id}")
    public ResponseEntity<Producto> getProductoById(@PathVariable Integer id) {
        try {
            Optional<Producto> productoOptional = productoService.getProductoById(id);
            if (productoOptional.isPresent()) {
                Producto producto = productoOptional.get();
                return ResponseEntity.status(HttpStatus.OK).body(producto);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } catch (Exception e) {
            logger.error("An error occurred while retrieving the product with ID: " + id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @CrossOrigin(origins = endpoint)
    @GetMapping("/random")
    public ResponseEntity<List<ProductoDTO>> getRandomProductos() {
        List<Producto> productos = productoRepository.getRandomProductos();
        List<ProductoDTO> productoDTOs = productos.stream()
                .map(producto -> mapper.convertValue(producto, ProductoDTO.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok(productoDTOs);
    }


    @CrossOrigin(origins = endpoint)
    @PostMapping("/agregar")
    public ResponseEntity<?> agregarProducto(@RequestBody ProductoDTO productoDTO) {
        return productoService.agregarProducto(productoDTO);
    }


    @CrossOrigin(origins = endpoint)
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminarProducto(@PathVariable Integer id) {
        productoService.eliminarProducto(id);
        return ResponseEntity.status(HttpStatus.OK).body("Producto eliminado exitosamente.");
    }

    @CrossOrigin(origins = endpoint)
    @GetMapping("/paginado")
    public Page<Producto> obtenerProductosPaginados(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productoRepository.findAll(pageable);
    }
    @CrossOrigin(origins = endpoint)
    @GetMapping("/byCategoria/{categoria_id}")
    public ResponseEntity<List<Producto>> getProductosByCategoria(@PathVariable Integer categoria_id) {
        try {
            Optional<Categoria> categoria = categoriaRepository.findById(categoria_id);
            if (categoria.isPresent()) {
                List<Producto> productos = productoRepository.findByCategoria(categoria.get());
                return ResponseEntity.ok(productos);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @CrossOrigin(origins = endpoint)
    @RequestMapping(value = "/modificar/{id}", method = RequestMethod.PATCH)
    public Producto modificarProducto(@PathVariable Integer id, @RequestBody ProductoDTO productoDTO){
        return productoService.modificarProducto(id, productoDTO);
    }

}