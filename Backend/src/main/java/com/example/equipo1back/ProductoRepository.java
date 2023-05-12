package com.example.equipo1back;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductoRepository extends
        JpaRepository<Producto, Integer> {

    @Query(value = "SELECT * FROM producto ORDER BY RAND() LIMIT 10", nativeQuery = true)
    List<Producto> getRandomProductos();
}
