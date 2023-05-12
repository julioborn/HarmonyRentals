package com.example.equipo1back;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/producto")
public class ProductoController {
    private final ProductoService productoService;
    @Autowired
    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    @GetMapping("/getProductos")
    public List<Producto> getProductos() {
        return productoService.getProductos();
    }

    @PostMapping("/registrarProducto")
    public ResponseEntity<String> agregarProducto(@RequestBody Producto producto) {
        productoService.registrarProducto(producto);
        return ResponseEntity.status(HttpStatus.CREATED).body("Producto creado exitosamente.");
    }
    @DeleteMapping("/eliminarProducto/{id}")
    public ResponseEntity<String> eliminarProducto(@PathVariable Integer id) {
        productoService.eliminarProducto(id);
        return ResponseEntity.status(HttpStatus.OK).body("Producto eliminado exitosamente.");
    }

}