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
public class FechaReservada {
    private Date fecha_desde;
    private Date fecha_hasta;
}
