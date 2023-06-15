package HarmonyRentals.Models;

import HarmonyRentals.Repository.CategoriaRepository;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


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

    @Column(name = "imagen")
    private String imagen;

    @Column(name = "imagen2")
    private String imagen2;

    @Column(name = "imagen3")
    private String imagen3;

    @Column(name = "imagen4")
    private String imagen4;

    @Column(name = "imagen5")
    private String imagen5;

    @Column(name = "precio_x_dia")
    private Double precio_x_dia;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "categoria_id")
    private Categoria categoria;

    public Integer getCategoria_id() {
        return categoria != null ? categoria.getId() : null;
    }

    public void setCategoria_id(Integer categoria_id) {
        Categoria categoria = new Categoria();
        categoria.setId(categoria_id);
        this.categoria = categoria;
    }
// Constructores: 1 todos los atributos, 2 todos menos id, 3 vacío.

    public Producto(CategoriaRepository categoriaRepository, Integer id, String nombre, String descripcion, String imagen, Double precio_x_dia, Integer categoria_id, Categoria categoria) {

        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.precio_x_dia = precio_x_dia;
        this.categoria = categoria;

    }

    public Producto(CategoriaRepository categoriaRepository, String nombre, String descripcion, String imagen, Double precio_x_dia, Integer categoria_id, Categoria categoria) {

        this.nombre = nombre;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.precio_x_dia = precio_x_dia;
        this.categoria = categoria;

    }


    // getters and setters
    public Integer getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public String getImagen() {
        return imagen;
    }

    public Double getPrecio_x_dia() {
        return precio_x_dia;
    }


    public void setId(Integer id) {
        this.id = id;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public void setPrecio_x_dia(Double precio_x_dia) {
        this.precio_x_dia = precio_x_dia;
    }

    @Override
    public String toString() {
        return "Producto{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", descripcion='" + descripcion + '\'' +
                ", imagen='" + imagen + '\'' +
                ", precio_x_dia=" + precio_x_dia +
                ", categoria=" + categoria +
                '}';
    }
}

