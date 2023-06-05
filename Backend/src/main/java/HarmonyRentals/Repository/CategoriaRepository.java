package HarmonyRentals.Repository;

import HarmonyRentals.Models.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Integer> {
    Categoria getById(int id);
  Categoria findByNombre(String nombre);
}
