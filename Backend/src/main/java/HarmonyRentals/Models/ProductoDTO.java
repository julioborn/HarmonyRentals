package HarmonyRentals.Models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@ToString
@AllArgsConstructor


public class ProductoDTO {
    @JsonProperty("id")
    private Integer id;

    @JsonProperty("nombre")
    private String nombre;

    @JsonProperty("descripcion")
    private String descripcion;


    @JsonProperty("precio_x_dia")
    private Double precio_x_dia;

    @JsonProperty("imagenes")
    private List<String> imagenes;

    @JsonProperty("categoria_id")
    private Integer categoria_id;
    @JsonProperty("stock")
    private Integer stock;
    public Integer getCategoria_id() {
        return categoria_id;
    }

    public void setCategoria_id(Integer categoria_id) {
        this.categoria_id = categoria_id;
    }
}