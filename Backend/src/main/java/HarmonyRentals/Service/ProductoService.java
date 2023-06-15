package HarmonyRentals.Service;

import HarmonyRentals.Models.Categoria;
import HarmonyRentals.Models.Producto;
import HarmonyRentals.Models.ProductoDTO;
import HarmonyRentals.Repository.CategoriaRepository;
import HarmonyRentals.Repository.ProductoRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class ProductoService {

    private final ProductoRepository productoRepository;
    private final CategoriaRepository categoriaRepository;
    private final ObjectMapper mapper;

    public ProductoService(ProductoRepository productoRepository, CategoriaRepository categoriaRepository, ObjectMapper mapper) {
        this.productoRepository = productoRepository;
        this.categoriaRepository = categoriaRepository;
        this.mapper = mapper;

        // Configure the ObjectMapper to ignore Hibernate proxy objects and properties
        mapper.configure(com.fasterxml.jackson.databind.SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
        mapper.configure(com.fasterxml.jackson.databind.DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    }
    public List<Producto> getProductos() {
        return productoRepository.findAll();
    }
    public Optional<Producto> getProductoById(Integer id) {
        return productoRepository.findById(id);
    }
    public ResponseEntity<?> agregarProducto(ProductoDTO productoDTO) {
        Producto producto = mapper.convertValue(productoDTO, Producto.class);
        Producto existingProducto = productoRepository.findByNombre(producto.getNombre());
        if (existingProducto != null) {
            String errorMessage = "Ya existe el producto";
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("{\"message\":\"" + errorMessage + "\"}");
        }
        {/*  Categoria categoriaProducto = categoriaRepository.getById(productoDTO.getCategoria_id());
        producto.setCategoria_id(categoriaProducto);*/}
        Producto savedProducto = productoRepository.save(producto);
          ProductoDTO nuevoProductoDTO = mapper.convertValue(savedProducto, ProductoDTO.class);
    {/* nuevoProductoDTO.setCategoria_id(categoriaProducto.getId());*/}
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoProductoDTO);
    }

    public void eliminarProducto(Integer id) {
        productoRepository.deleteById(id);
    }
    public List<Producto> getProductosByCategoria(Categoria categoria) {
        try {
            return productoRepository.findByCategoria(categoria);
        } catch (Exception e) {

            e.printStackTrace();
            return Collections.emptyList();
        }
    }
    public Producto modificarProducto(Integer id, ProductoDTO productoDTO) {
        Optional<Producto> optionalProducto = productoRepository.findById(id);
        if (optionalProducto.isPresent()) {
            Producto productoExistente = optionalProducto.get();
            actualizarProducto(productoExistente, productoDTO);
            return productoRepository.save(productoExistente);
        }
        return null;
    }

    private void actualizarProducto(Producto productoExistente, ProductoDTO productoDTO) {
        productoExistente.setNombre(productoDTO.getNombre());
        productoExistente.setDescripcion(productoDTO.getDescripcion());
        productoExistente.setImagen(productoDTO.getImagen());
        productoExistente.setImagen2(productoDTO.getImagen2());
        productoExistente.setImagen3(productoDTO.getImagen3());
        productoExistente.setImagen4(productoDTO.getImagen4());
        productoExistente.setImagen5(productoDTO.getImagen5());
        productoExistente.setPrecio_x_dia(productoDTO.getPrecio_x_dia());
        productoExistente.setCategoria_id(productoDTO.getCategoria_id());
    }

    public List<Producto> buscaProductos(String query) {
        List<Producto> results = productoRepository.findByNombreContainingIgnoreCase(query);
        return results;
    }
}
