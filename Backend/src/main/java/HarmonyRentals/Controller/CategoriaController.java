package HarmonyRentals.Controller;

import HarmonyRentals.Models.Categoria;
import HarmonyRentals.Models.CategoriaDTO;
import HarmonyRentals.Repository.CategoriaRepository;
import HarmonyRentals.Service.CategoriaService;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

import static HarmonyRentals.HarmonyRentalsApp.endpoint;

@Log4j2
@RestController
@RequestMapping("/categoria")
public class CategoriaController {
    private final CategoriaRepository categoriaRepository;
    private final CategoriaService categoriaService;

    public CategoriaController(CategoriaRepository categoriaRepository, CategoriaService categoriaService) {
        this.categoriaRepository = categoriaRepository;
        this.categoriaService = categoriaService;
    }
    @CrossOrigin(origins = endpoint)
    @GetMapping("/todas")
    public ResponseEntity<List<Categoria>> getCategorias() {
        // Retrieve the authentication object from the SecurityContextHolder
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // Check if the user is authenticated
        if (authentication.isAuthenticated()) {
            List<Categoria> categorias = categoriaRepository.findAll();
            return ResponseEntity.ok(categorias);
        } else {
            // Return an unauthorized response if the user is not authenticated
            log.info("no autorizado");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @CrossOrigin(origins = endpoint)
    @GetMapping("/{id}")
    public ResponseEntity<Categoria> getCategoriaById(@PathVariable Integer id) {
        Optional<Categoria> categoria = categoriaRepository.findById(id);
        if (categoria.isPresent()) {
            return ResponseEntity.ok(categoria.get());
        } else {
            return ResponseEntity.notFound().build();
        }


    }
    @CrossOrigin(origins = endpoint)
    @PostMapping("/agregar")
    public ResponseEntity<ResponseEntity<?>> agregarCategoria(@RequestBody CategoriaDTO categoriaDTO) {
        ResponseEntity<?> nuevaCategoriaDTO = categoriaService.agregarCategoria(categoriaDTO);
        return ResponseEntity.ok(nuevaCategoriaDTO);
    }
    @CrossOrigin(origins = endpoint)
    @PutMapping("/modificar/{id}")
    public ResponseEntity<?> modificarCategoria(@PathVariable Integer id, @RequestBody CategoriaDTO categoriaDTO) {
        return categoriaService.modificarCategoria(id, categoriaDTO);
    }
    @CrossOrigin(origins = endpoint)
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminarCategoria(@PathVariable Integer id) {
        Optional<Categoria> categoria = categoriaRepository.findById(id);
        if (categoria.isPresent()) {
            categoriaRepository.deleteById(id);
            return ResponseEntity.ok("Categoria eliminada");
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}