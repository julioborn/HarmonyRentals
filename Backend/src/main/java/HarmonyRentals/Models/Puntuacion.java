package HarmonyRentals.Models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@Table(name = "puntuacion")
@Entity
public class Puntuacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "producto_id")
    private Producto producto;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @Column(name = "puntaje", nullable = false)
    private Integer puntaje;

    // Constructor sin ID
    public Puntuacion(Usuario usuario, Producto producto, Integer puntaje) {
        this.usuario = usuario;
        this.producto = producto;
        this.puntaje = puntaje;
    }

    // Getters y Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUsuario_id() {
        return usuario != null ? usuario.getId() : null;
    }

    public void setUsuario_id(Integer usuario_id) {
        Usuario usuario = new Usuario();
        usuario.setId(usuario_id);
        this.usuario = usuario;
    }

    public Integer getProducto_id() {
        return producto != null ? producto.getId() : null;
    }


    public void setProducto_id(Integer producto_id) {
        Producto producto = new Producto();
        producto.setId(producto_id);
        this.producto = producto;
    }


    public Integer getPuntaje(Integer producto_id) {
        return puntaje;
    }

    public void setPuntaje(Integer puntaje) {
        this.puntaje = puntaje;
    }

    //To String
    @Override
    public String toString() {
        return "Puntuacion{" +
                "id=" + id +
                ", producto='" + producto + '\'' +
                ", usuraio='" + usuario + '\'' +
                ", puntaje='" + puntaje +
                '}';
    }
}