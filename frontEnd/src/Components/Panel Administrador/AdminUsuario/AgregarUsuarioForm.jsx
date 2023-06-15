import { useState } from "react";
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
  Select,
  MenuItem,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  nombre: Yup.string().required("El nombre es requerido"),
  apellido: Yup.string().required("El apellido es requerido"),
  email: Yup.string().email("Formato de email inválido").required("El email es requerido"),
  password: Yup.string().required("La contraseña es requerida"),
  rol: Yup.string().required("El rol es requerido"),
  verificado: Yup.number().required("El estado de verificación es requerido"),
});

const initialValues = {
  nombre: "",
  apellido: "",
  email: "",
  password: "",
  rol: "",
  verificado: 0,
};

const AgregarUsuarioForm = () => {
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await fetch("http://3.145.94.82:8080/usuario/agregar", {
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
      setUsuario(responseData);
      setError(null);
      resetForm();
    } catch (error) {
      setError(error.message || "An error occurred. Please try again.");
      console.error(error);
    } finally {
      setSubmitting(false);
      swal({
        title: "Agregado",
        text: "Usuario agregado correctamente",
        icon: "success",
        timer: 3000,
        buttons: false
      })
    }
  };

  return (
    <Box sx={{ mt: "2vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Grid container spacing={4} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center" }}>
        <Grid item xs={12} sm={6}>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ errors, touched }) => (
              <Form>
                <Paper sx={{ padding: "5vh" }}>
                  <Typography variant="h5" sx={{ mb: 1 }}>
                    Agregar Usuario
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <InputLabel htmlFor="nombre">Nombre</InputLabel>
                      <FormControl fullWidth sx={{ mb: 1 }}>
                        <Field as={TextField} id="nombre" name="nombre" size="small" error={errors.nombre && touched.nombre} />
                        {errors.nombre && touched.nombre && <FormHelperText>{errors.nombre}</FormHelperText>}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <InputLabel htmlFor="apellido">Apellido</InputLabel>
                      <FormControl fullWidth sx={{ mb: 1 }}>
                        <Field as={TextField} id="apellido" name="apellido" size="small" error={errors.apellido && touched.apellido} />
                        {errors.apellido && touched.apellido && <FormHelperText>{errors.apellido}</FormHelperText>}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <InputLabel htmlFor="email">Email</InputLabel>
                      <FormControl fullWidth sx={{ mb: 1 }}>
                        <Field as={TextField} id="email" name="email" size="small" error={errors.email && touched.email} />
                        {errors.email && touched.email && <FormHelperText>{errors.email}</FormHelperText>}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <InputLabel htmlFor="password">Contraseña</InputLabel>
                      <FormControl fullWidth sx={{ mb: 1 }}>
                        <Field as={TextField} id="password" name="password" type="password" size="small" error={errors.password && touched.password} />
                        {errors.password && touched.password && <FormHelperText>{errors.password}</FormHelperText>}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <InputLabel htmlFor="rol">Rol</InputLabel>
                      <FormControl fullWidth sx={{ mb: 1 }}>
                        <Field as={Select} id="rol" name="rol" size="small" error={errors.rol && touched.rol}>
                          <MenuItem value="">Seleccionar</MenuItem>
                          <MenuItem value="2">Administrador</MenuItem>
                          <MenuItem value="1">Usuario</MenuItem>
                        </Field>
                        {errors.rol && touched.rol && <FormHelperText>{errors.rol}</FormHelperText>}
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button variant="contained" color="primary" type="submit" sx={{ marginTop: 3, textTransform:"none" }}>
                      Agregar Usuario
                    </Button>
                  </Box>
                  {usuario && usuario.id && (
                    <Box>
                      <Typography variant="body1">Usuario agregado:</Typography>
                      <Typography variant="body2">Id de Usuario: {usuario.id}</Typography>
                      <Typography variant="body2">Nombre: {usuario.nombre}</Typography>
                      <Typography variant="body2">Apellido: {usuario.apellido}</Typography>
                      <Typography variant="body2">Email: {usuario.email}</Typography>
                      <Typography variant="body2">Rol: {usuario.rol}</Typography>
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

export default AgregarUsuarioForm;
