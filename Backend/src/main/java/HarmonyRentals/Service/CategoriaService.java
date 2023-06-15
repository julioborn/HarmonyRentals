package HarmonyRentals.Service;

import HarmonyRentals.Models.Categoria;
import HarmonyRentals.Models.CategoriaDTO;
import HarmonyRentals.Models.Producto;
import HarmonyRentals.Models.ProductoDTO;
import HarmonyRentals.Repository.CategoriaRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaService {
    @Autowired
    private final CategoriaRepository categoriaRepository;
    @Autowired
    ObjectMapper mapper;
    public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }
    public Categoria findById(Integer id) {
        return categoriaRepository.findById(id).orElse(null);
    }
    public List<Categoria> findAll() {
        return categoriaRepository.findAll();
    }
    public void save(Categoria categoria) {
        categoriaRepository.save(categoria);
    }
    public void deleteById(Integer id) {
        categoriaRepository.deleteById(id);
    }

    public ResponseEntity<?> agregarCategoria(CategoriaDTO categoriaDTO) {
        Categoria categoria = mapper.convertValue(categoriaDTO, Categoria.class);
        Categoria existingCategoria = categoriaRepository.findByNombre(categoria.getNombre());
        if (existingCategoria != null) {
            String errorMessage = "Ya existe la categoria";
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("{\"message\":\"" + errorMessage + "\"}");
        }

        Categoria savedCategoria = categoriaRepository.save(categoria);
        CategoriaDTO nuevaCategoriaDTO = mapper.convertValue(savedCategoria, CategoriaDTO.class);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevaCategoriaDTO);
    }

    public ResponseEntity<?> modificarCategoria(Integer id, CategoriaDTO categoriaDTO) {
        Categoria categoriaExistente = categoriaRepository.findById(id).orElse(null);
        if (categoriaExistente == null) {
            String errorMessage = "La categoría no existe";
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("{\"message\":\"" + errorMessage + "\"}");
        }
        Categoria categoriaModificada = mapper.convertValue(categoriaDTO, Categoria.class);
        categoriaModificada.setId(id);
        Categoria savedCategoria = categoriaRepository.save(categoriaModificada);
        CategoriaDTO categoriaModificadaDTO = mapper.convertValue(savedCategoria, CategoriaDTO.class);
        return ResponseEntity.status(HttpStatus.OK).body(categoriaModificadaDTO);
    }
    // ...
}
