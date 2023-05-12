package com.example.equipo1back;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoRepository extends
        JpaRepository<Producto, Integer> {

}
