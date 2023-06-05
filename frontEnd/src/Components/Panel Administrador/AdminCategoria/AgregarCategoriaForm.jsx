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
});

const initialValues = {
  nombre: "",
  descripcion: "",
  imagen: "",
};

const AgregarCategoriaForm = () => {
  const [categoria, setCategoria] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await fetch("http://3.145.94.82:8080/categoria/agregar", {
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

      setCategoria(responseData);
      setError(null);
      resetForm();
    } catch (error) {
      setError(error.message || "An error occurred. Please try again.");
      console.error(error);
    } finally {
      setSubmitting(false);
      swal({
        title: "Agregada",
        text: "Categoría agregada correctamente",
        icon: "success",
        timer: 3000,
        buttons: false
      })
    }
  };
  const handleClose = () => {
    setProducto(null);
  };

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
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Grid item xs={12} sm={6}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, setFieldValue }) => (
              <Form>
                <Paper sx={{ padding: "5vh" }}>
                  <Typography variant="h5" sx={{ mb: 1 }}>
                    Agregar Categoria
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
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
                    <Grid item xs={12} sm={12}>
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
                    <Grid item xs={12} sm={12}>
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
                  </Grid>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center"
                    }}
                  >
                    <Button variant="contained" color="primary" type="submit" sx={{ marginTop: 2, textTransform:"none" }}>
                      Agregar Categoria
                    </Button>
                  </Box>
                  {categoria && categoria.id && (
                    <Box>
                      <Box style={{ textAlign: "right" }}>
                        <IconButton onClick={handleClose}>
                          <CloseIcon />
                        </IconButton>
                      </Box>
                      <Typography variant="body1">
                        Categoria agregada:
                      </Typography>
                      <Typography variant="body2">
                        Id de Categoria: {categoria.id}
                      </Typography>
                      <Typography variant="body2">
                        Nombre: {categoria.nombre}
                      </Typography>                      
                      <CardMedia
                        component="img"
                        src={categoria.imagen}
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

export default AgregarCategoriaForm;
