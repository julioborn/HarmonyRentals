package com.example.equipo1back;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductoService {
    @Autowired
    private final ProductoRepository productoRepository;

    public ProductoService(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }


    public List<Producto> getProductos() {
        return productoRepository.findAll();
    }


    public Optional<Producto> getProductoById(Integer id) {
        return productoRepository.findById(id);
    }

    public void registrarProducto(Producto producto){
        productoRepository.save(producto);
    }

    public void eliminarProducto(Integer id) {
        productoRepository.deleteById(id);
    }

}
