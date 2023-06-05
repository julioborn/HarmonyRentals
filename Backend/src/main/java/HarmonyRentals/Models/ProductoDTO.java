package HarmonyRentals.Models;

import com.fasterxml.jackson.annotation.*;
import lombok.*;


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

    @JsonProperty("imagen")
    private String imagen;

    @JsonProperty("imagen2")
    private String imagen2;

    @JsonProperty("imagen3")
    private String imagen3;

    @JsonProperty("imagen4")
    private String imagen4;

    @JsonProperty("imagen5")
    private String imagen5;

    @JsonProperty("precio_x_dia")
    private Double precio_x_dia;

    @JsonProperty("categoria_id")
    private Integer categoria_id;

    public Integer getCategoria_id() {
        return categoria_id;
    }

    public void setCategoria_id(Integer categoria_id) {
        this.categoria_id = categoria_id;
    }
}