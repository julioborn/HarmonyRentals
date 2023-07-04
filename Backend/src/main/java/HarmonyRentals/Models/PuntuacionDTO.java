package HarmonyRentals.Models;

import com.fasterxml.jackson.annotation.*;
import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@ToString
@AllArgsConstructor
public class PuntuacionDTO {
    @JsonProperty("id")
    private Integer id;

    @JsonProperty("usuario_id")
    private Integer usuario_id;

    @JsonProperty("producto_id")
    private Integer producto_id;

    @JsonProperty("puntaje")
    private Integer puntaje;

    public Integer getUsuario_id() {
        return usuario_id;
    }

    public void setUsuario_id(Integer usuario_id) {
        this.usuario_id = usuario_id;
    }

    public Integer getProducto_id() {
        return producto_id;
    }

    public void setProducto_id(Integer producto_id) {
        this.producto_id = producto_id;
    }
}
