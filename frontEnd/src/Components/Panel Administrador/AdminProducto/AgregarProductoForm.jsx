import { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  TextField,
  Typography,
  CardMedia,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import swal from "sweetalert";

const validationSchema = Yup.object({
  nombre: Yup.string().required("El nombre es requerido"),
  descripcion: Yup.string().required("La descripción es requerida"),
  imagen: Yup.string(),
  precio_x_dia: Yup.number()
    .typeError("El precio debe ser un número")
    .required("El precio es requerido"),
  categoria_id: Yup.string()
    .typeError("La categoría debe ser un número")
    .required("La categoría es requerida"),
});

const initialValues = {
  nombre: "",
  descripcion: "",
  imagen: "",
  precio_x_dia: "",
  categoria_id: "",
};

const AgregarProductoForm = () => {
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await fetch("http://3.145.94.82:8080/producto/agregar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "An error occurred.");
      }

      setProducto(responseData);
      setError(null);
      resetForm();
    } catch (error) {
      setError(error.message || "An error occurred. Please try again.");
      console.error(error);
    } finally {
      setSubmitting(false);
      swal({
        title: "Agregado",
        text: "Producto agregado correctamente",
        icon: "success",
        timer: 3000,
        buttons: false
      });
    }
  };
  const handleClose = () => {
    setProducto(null);
  };

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch("http://3.145.94.82:8080/categoria/todas");
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategorias();
  }, []);

  return (
    <Box
      sx={{
        mt: "2vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        container
        spacing={4}
        justifyContent="center"
      >
        <Grid item xs={12} lg={7}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, setFieldValue }) => (
              <Form>
                <Paper sx={{ padding: "5vh" }}>
                  <Typography variant="h5" sx={{ mb: 1 }}>
                    Agregar Producto
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <InputLabel htmlFor="nombre">Nombre</InputLabel>
                      <FormControl fullWidth sx={{ mb: 1 }}>
                        <Field
                          size="small"
                          as={TextField}
                          id="nombre"
                          name="nombre"
                          error={errors.nombre && touched.nombre}
                        />
                        {errors.nombre && touched.nombre && (
                          <FormHelperText>{errors.nombre}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <InputLabel htmlFor="descripcion">Descripción</InputLabel>
                      <FormControl fullWidth sx={{ mb: 1 }}>
                        <Field
                          size="small"
                          as={TextField}
                          id="descripcion"
                          name="descripcion"
                          error={errors.descripcion && touched.descripcion}
                        />
                        {errors.descripcion && touched.descripcion && (
                          <FormHelperText>{errors.descripcion}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <InputLabel htmlFor="imagen">Imagen</InputLabel>
                      <FormControl fullWidth sx={{ mb: 1 }}>
                        <Field
                          size="small"
                          as={TextField}
                          id="imagen"
                          name="imagen"
                          error={errors.imagen && touched.imagen}
                        />
                        {errors.imagen && touched.imagen && (
                          <FormHelperText>{errors.imagen}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <InputLabel htmlFor="precio_x_dia">
                        Precio por día
                      </InputLabel>
                      <FormControl fullWidth sx={{ mb: 1 }}>
                        <Field
                          size="small"
                          as={TextField}
                          id="precio_x_dia"
                          name="precio_x_dia"
                          type="number"
                          error={errors.precio_x_dia && touched.precio_x_dia}
                        />
                        {errors.precio_x_dia && touched.precio_x_dia && (
                          <FormHelperText>{errors.precio_x_dia}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <InputLabel htmlFor="categoria_id">Categoría</InputLabel>
                      <FormControl fullWidth sx={{ mb: 1 }}>
                        <Field
                          size="small"
                          as={Select}
                          id="categoria_id"
                          name="categoria_id"
                          style={{ color: "black" }}
                          error={errors.categoria_id && touched.categoria_id}
                          onChange={(event) => {
                            const selectedCategoryId = event.target.value;
                            setFieldValue("categoria_id", selectedCategoryId);
                          }}
                        >
                          {categorias.map((categoria) => (
                            <MenuItem
                              key={categoria.id}
                              value={categoria.id}
                              style={{ color: "black" }}
                            >
                              {categoria.nombre}
                            </MenuItem>
                          ))}
                        </Field>
                        {errors.categoria_id && touched.categoria_id && (
                          <FormHelperText>{errors.categoria_id}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center"
                    }}
                  >
                    <Button variant="contained" color="primary" type="submit" sx={{ marginTop: 3, textTransform:"none" }}>
                      Agregar Producto
                    </Button>
                  </Box>
                  {producto && producto.id && (
                    <Box>
                      <Box style={{ textAlign: "right" }}>
                        <IconButton onClick={handleClose}>
                          <CloseIcon />
                        </IconButton>
                      </Box>
                      <Typography variant="h6">
                        Producto agregado
                      </Typography>
                      <Typography variant="body2">
                        ID: {producto.id}
                      </Typography>
                      <Typography variant="body2">
                        Categoría: {categorias.find((categoria) => categoria.id === producto.categoria_id)?.nombre}
                      </Typography>
                      <Typography variant="body2">
                        Nombre: {producto.nombre}
                      </Typography>
                      <Typography variant="body2">
                        Precio por Día: {producto.precio_x_dia}
                      </Typography>
                      <CardMedia
                        component="img"
                        src={producto.imagen}
                        alt="Product Image"
                        sx={{ maxHeight: "300px", objectFit: "contain" }}
                      />
                    </Box>
                  )}
                  {error && <Typography variant="body1">{error}</Typography>}
                </Paper>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AgregarProductoForm;
