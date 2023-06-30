package HarmonyRentals.Models;



import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AlquilerDTO {
    private Integer id;
    private Date fecha_desde;
    private Date fecha_hasta;
    private Integer producto_id;
    private Integer usuario_id;
    private Double valor;
}