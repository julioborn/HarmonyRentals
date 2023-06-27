package HarmonyRentals.Models;

import Utils.StringListConverter;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;


@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@Entity
@Table(name = "producto")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Integer id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "descripcion")
    private String descripcion;


    @Column(name = "precio_x_dia")
    private Double precio_x_dia;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "categoria_id")
    private Categoria categoria;




    @Column(name = "stock")
    private Integer stock;

    @Convert(converter = StringListConverter.class)
    @Column(name = "imagenes", columnDefinition = "JSON")
    private List<String> imagenes;
    public Integer getCategoria_id() {
        return categoria != null ? categoria.getId() : null;
    }

    public void setCategoria_id(Integer categoria_id) {
        Categoria categoria = new Categoria();
        categoria.setId(categoria_id);
        this.categoria = categoria;
    }
// ...

    public String getImagen() {
        return imagenes != null && !imagenes.isEmpty() ? imagenes.get(0) : null;
    }

    public void setImagen(String imagen) {
        if (imagenes == null) {
            imagenes = new ArrayList<>();
        }
        if (imagenes.isEmpty()) {
            imagenes.add(imagen);
        } else {
            imagenes.set(0, imagen);
        }
    }

// ...

    @Override
    public String toString() {
        return "Producto{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", descripcion='" + descripcion + '\'' +

                ", precio_x_dia=" + precio_x_dia +
                ", categoria=" + categoria +
                '}';
    }
}

