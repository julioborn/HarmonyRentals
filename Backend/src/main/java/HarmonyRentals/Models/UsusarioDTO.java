package HarmonyRentals.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsusarioDTO {

    private Integer id;
    private String nombre;
    private String apellido;
    private String email;
    private String password;
    private Rol rol;
    private Integer verificado;
}
