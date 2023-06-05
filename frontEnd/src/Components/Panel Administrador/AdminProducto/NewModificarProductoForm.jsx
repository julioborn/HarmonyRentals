import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Loading from "../../Loading";

const validationSchema = Yup.object({
  nombre: Yup.string().required("El nombre es requerido"),
  descripcion: Yup.string().required("La descripción es requerida"),
  imagen: Yup.string(),
  imagen2: Yup.string(),
  imagen3: Yup.string(),
  imagen4: Yup.string(),
  imagen5: Yup.string(),
  precio_x_dia: Yup.number().required("El precio por día es requerido"),
  categoria_id: Yup.number().required("El ID de la categoría es requerido"),
});

const NewModificarProductoForm = ({ productoId }) => {
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState(null);
  const [isEditingComplete, setIsEditingComplete] = useState(false);

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCategorias, setLoadingCategorias] = useState(true);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch("http://localhost:8080/categoria/todas");
        const data = await response.json();
        setCategorias(data);
        setLoadingCategorias(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoadingCategorias(false);
      }
    };
    fetchCategorias();
  }, []);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/producto/${productoId}`
        );
        const data = await response.json();
        setProducto(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProducto();
  }, [productoId]);

  const handleSubmit = async (values, { setSubmitting }) => {
    const { ...otherValues } = values;
    try {
        const token = sessionStorage.getItem('token');
      const response = await fetch(
        `http://localhost:8080/producto/modificar/${productoId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,

          },
          body: JSON.stringify({
            ...otherValues,
          }),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || "An error occurred.");
      }
      setProducto(responseData);
      setIsEditingComplete(true);
      setError(null);
    } catch (error) {
      setError(error.message || "An error occurred. Please try again.");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setProducto(null);
  };

  const handleImageUpload = (event) => {
    const newImages = Array.from(event.target.files);
    setImages(newImages);
  };

  if (loading) {
    return <Loading />;
  }

  if (isEditingComplete) {
    return (
      <Grid container spacing={2} sx={{ marginTop: "3vh", display: "flex", justifyContent: "center" }}>
        <Paper elevation={3} sx={{ p: 2, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Grid item xs={6}>
            <Typography variant="h6">Producto modificado</Typography>
            <Typography variant="body1">Nombre: {producto.nombre}</Typography>
            <Typography variant="body1">Descripción: {producto.descripcion}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              {/* Image Display */}
              {producto.imagen && (
                <img
                  src={producto.imagen}
                  alt="Imagen del producto"
                  style={{ width: "auto", height: "200px", marginBottom: "1rem" }}
                />
              )}

              {/* Additional Pictures Frames */}
              <Grid container spacing={1}>
                {images.slice(0, 4).map((image, index) => (
                  <Grid item key={index} xs={3}>
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Imágenes del producto ${index + 1}`}
                      style={{ height: "100px", width: "auto" }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Paper>
      </Grid>
    );
  }

  return (
    <Formik
      initialValues={{
        nombre: producto.nombre || "",
        descripcion: producto.descripcion || "",
        imagen: producto.imagen || "",
        imagen2: producto.imagen2 || "",
        imagen3: producto.imagen3 || "",
        imagen4: producto.imagen4 || "",
        imagen5: producto.imagen5 || "",
        precio_x_dia: producto.precio_x_dia || 0,
        categoria_id: producto.categoria_id || 0,
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <Form>
          <Paper elevation={3} sx={{ p: 4, pt: 0 }}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              height="100%"
            >
              <Typography variant="h5" sx={{ mt: 3 }}>
                Modificar producto
              </Typography>
              <Grid container spacing={2} sx={{ marginTop: "3vh" }}>
                <Grid item xs={6}>
                  <Field
                    name="nombre"
                    as={TextField}
                    label="Nombre"
                    fullWidth
                    sx={{ marginBottom: "3vh" }}
                  />
                  <Field
                    name="descripcion"
                    as={TextField}
                    multiline
                    rows={6}
                    rowsMax={8}
                    label="Descripción"
                    fullWidth
                    sx={{ marginBottom: "3vh" }}
                  />
                  <Field
                    name="precio_x_dia"
                    as={TextField}
                    type="number"
                    label="Precio por día"
                    fullWidth
                    sx={{ marginBottom: "3vh" }}
                  />
                 <FormControl fullWidth sx={{ marginBottom: "3vh" }}>
                    <InputLabel id="categoria-label">Categoría</InputLabel>
                    <Field
                      name="categoria_id"
                      as={Select}
                      labelId="categoria-label"
                    >
                      {categorias.map((categoria) => (
                        <MenuItem key={categoria.id} value={categoria.id}>
                          {categoria.nombre}
                        </MenuItem>
                      ))}
                    </Field>
                    <FormHelperText>
                      {formikProps.touched.categoria_id &&
                        formikProps.errors.categoria_id}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  
                 
{/* 
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                  />
*/}
                  {formikProps.touched.imagen && formikProps.errors.imagen && (
                    <Typography variant="body2" color="error">
                      {formikProps.errors.imagen}
                    </Typography>
                  )}


                   <Box sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                   {formikProps.values.imagen && (
                    <img
                      src={formikProps.values.imagen}
                      alt="Imagen del producto"
                      style={{ width: "auto", height: "100px" }}
                    />
                  )}
                  <Field                  
                    name="imagen"
                    as={TextField}
                    label="Imagen"
                    fullWidth
                    sx={{ marginBottom: "3vh" }}
                  />
                  </Box>
                  <Box sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                   {formikProps.values.imagen2 && (
                    <img
                      src={formikProps.values.imagen2}
                      alt="Imagen del producto"
                      style={{ width: "auto", height: "100px" }}
                    />
                  )}
                  <Field                  
                    name="imagen2"
                    as={TextField}
                    label="Imagen 2"
                    fullWidth
                    sx={{ marginBottom: "3vh" }}
                  />
                  </Box>
                  <Box sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                   {formikProps.values.imagen3 && (
                    <img
                      src={formikProps.values.imagen3}
                      alt="Imagen del producto"
                      style={{ width: "auto", height: "100px" }}
                    />
                  )}
                  <Field                  
                    name="imagen3"
                    as={TextField}
                    label="Imagen 3"
                    fullWidth
                    sx={{ marginBottom: "3vh" }}
                  />
                  </Box>
                  <Box sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                   {formikProps.values.imagen4 && (
                    <img
                      src={formikProps.values.imagen4}
                      alt="Imagen del producto"
                      style={{ width: "auto", height: "100px" }}
                    />
                  )}
                  <Field                  
                    name="imagen4"
                    as={TextField}
                    label="Imagen 4"
                    fullWidth
                    sx={{ marginBottom: "3vh" }}
                  />
                  </Box>
                  <Box sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                   {formikProps.values.imagen5 && (
                    <img
                      src={formikProps.values.imagen5}
                      alt="Imagen del producto"
                      style={{ width: "auto", height: "100px" }}
                    />
                  )}
                  <Field                  
                    name="imagen5"
                    as={TextField}
                    label="Imagen 5"
                    fullWidth
                    sx={{ marginBottom: "3vh" }}
                  />
                  </Box>
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={formikProps.isSubmitting}
              >
                Modificar
              </Button>
            </Box>
          </Paper>
        </Form>
      )}
    </Formik>
  );
};

export default NewModificarProductoForm;
