package com.example.equipo1back;
import jakarta.persistence.*;


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


    @Column(name = "precio_x_dia")
    private Double precio_x_dia;


    @Column(name = "categoria_id")
    private Integer categoria_id;



    //3 Constructores: 1 todos los atributos, 2 todos menos id, 3 vacío.

    public Producto(Integer id, String nombre, String descripcion, String imagen, Double precio_x_dia, Integer categoria_id) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.precio_x_dia = precio_x_dia;
        this.categoria_id = categoria_id;
    }

    public Producto(String nombre, String descripcion, String imagen, Double precio_x_dia, Integer categoria_id) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.precio_x_dia = precio_x_dia;
        this.categoria_id = categoria_id;
        }

    public Producto() {

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

    public Integer getCategoria_id() {
        return categoria_id;
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

    public void setCategoria_id(Integer categoria_id) {
        this.categoria_id = categoria_id;
    }

    @Override
    public String toString() {
        return "Producto{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", descripcion='" + descripcion + '\'' +
                ", imagen='" + imagen + '\'' +
                ", precio_x_dia=" + precio_x_dia +
                ", categoria_id=" + categoria_id +
                '}';
    }
}

