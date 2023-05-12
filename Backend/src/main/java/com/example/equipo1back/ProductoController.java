package com.example.equipo1back;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/producto")
public class ProductoController {
    private final ProductoService productoService;
    @Autowired

    public ProductoController(ProductoService productoService, ProductoRepository productoRepository) {
        this.productoService = productoService;
        this.productoRepository = productoRepository;
    }

    private final ProductoRepository productoRepository;
    @GetMapping("/todos")
    public List<Producto> getProductos() {
        return productoService.getProductos();
    }
@GetMapping("/{id}")
public ResponseEntity<Producto> getProductoById(@PathVariable Integer id) {
    Optional<Producto> productoOptional = productoService.getProductoById(id);
    if (productoOptional.isPresent()) {
        Producto producto = productoOptional.get();
        return ResponseEntity.status(HttpStatus.OK).body(producto);
    } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
    @GetMapping("/random")
    public ResponseEntity<List<Producto>> getRandomProductos() {
        List<Producto> productos = productoRepository.getRandomProductos();
        return ResponseEntity.status(HttpStatus.OK).body(productos);
    }

    @PostMapping("/agregar")
    public ResponseEntity<String> agregarProducto(@RequestBody Producto producto) {
        productoService.registrarProducto(producto);
        return ResponseEntity.status(HttpStatus.CREATED).body("Producto creado exitosamente.");
    }
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminarProducto(@PathVariable Integer id) {
        productoService.eliminarProducto(id);
        return ResponseEntity.status(HttpStatus.OK).body("Producto eliminado exitosamente.");
    }

}