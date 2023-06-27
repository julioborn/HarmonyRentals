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
  Select,
  MenuItem,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Loading from "../../Loading";
import axios from "axios";

const validationSchema = Yup.object({
  nombre: Yup.string().required("El nombre es requerido"),
  apellido: Yup.string().required("El apellido es requerido"),
  email: Yup.string()
    .email("Formato de email inválido")
    .required("El email es requerido"),
  password: Yup.string().required("La contraseña es requerida"),
  rol: Yup.object().shape({
    id: Yup.number().required("El rol es requerido"),
    nombre: Yup.string().required("El nombre del rol es requerido"),
  }),
  verificado: Yup.number().required("El estado de verificación es requerido"),
});

const ModificarUsuarioForm = ({ usuarioId }) => {
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState(null);
  const [isEditingComplete, setIsEditingComplete] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/usuario/${usuarioId}`);
        const data = response.data;
        setUsuario(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
  
    fetchUsuario();
  }, [usuario]);
  
  const handleSubmit = async (values, { setSubmitting }) => {
    const { rol, ...otherValues } = values;
    try {
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/usuario/modificar/${usuarioId}`, {
        ...otherValues,
        rol: {
          id: rol.id,
          nombre: rol.nombre,
        },
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = response.data;
      if (response.status !== 200) {
        throw new Error(responseData.message || "An error occurred.");
      }
      setUsuario(responseData);
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
    setUsuario(null);
  };

  if (loading) {
    return <Loading />;
  }

  if (isEditingComplete) {
    return (
      <Grid
        container
        spacing={2}
        sx={{ marginTop: "3vh", display: "flex", justifyContent: "center" }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid item xs={12}>
            <Typography variant="h6">Usuario modificado</Typography>
            <Typography variant="body1">Nombre: {usuario.nombre}</Typography>
            <Typography variant="body1">
              Apellido: {usuario.apellido}
            </Typography>
            <Typography variant="body1">Email: {usuario.email}</Typography>
            <Typography variant="body1">Rol: {usuario.rol?.nombre}</Typography>
            <Typography variant="body1">
              Verificado: {usuario.verificado}
            </Typography>
          </Grid>
        </Paper>
      </Grid>
    );
  }

  return (
    <Formik
      initialValues={{
        nombre: usuario.nombre || "",
        apellido: usuario.apellido || "",
        email: usuario.email || "",
        password: usuario.password || "",
        rol: usuario.rol || {},
        verificado: usuario.verificado || 0,
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <Form>
          <Paper elevation={3} sx={{ pt: 0, maxWidth: "90vw", margin: "auto" }}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              height="100%"
            >
              <Typography variant="h5" sx={{ mt: 3 }}>
                Modificar Usuario
              </Typography>
              <Grid container spacing={2} sx={{ marginTop: "3vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Grid item xs={8}>
                  <Field
                    size="small"
                    name="nombre"
                    as={TextField}
                    label="Nombre"
                    fullWidth
                    sx={{ marginBottom: "3vh" }}
                  />
                  <Field
                    size="small"
                    name="apellido"
                    as={TextField}
                    label="Apellido"
                    fullWidth
                    sx={{ marginBottom: "3vh" }}
                  />
                  <Field
                    size="small"
                    name="email"
                    as={TextField}
                    label="Email"
                    fullWidth
                    sx={{ marginBottom: "3vh" }}
                  />
                </Grid>
                <Grid item xs={8}>
                  <FormControl fullWidth sx={{ marginBottom: "3vh" }}>
                    <InputLabel>Rol</InputLabel>
                    <Field as={Select} name="rol.id" label="Rol" size="small">
                      <MenuItem value={1}>Usuario</MenuItem>
                      <MenuItem value={2}>Administrador</MenuItem>
                      {/* Add more MenuItem options as needed */}
                    </Field>
                    <FormHelperText>
                      {formikProps.touched.rol?.id &&
                        formikProps.errors.rol?.id}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={8}>
                  <FormControl fullWidth sx={{ marginBottom: "3vh" }}>
                    <InputLabel>Verificado</InputLabel>
                    <Field as={Select} name="verificado" label="verificado" size="small">
                      <MenuItem value={0}>No</MenuItem>
                      <MenuItem value={1}>Si</MenuItem>
                      {/* Add more MenuItem options as needed */}
                    </Field>
                    <FormHelperText>
                      {formikProps.touched.rol?.id &&
                        formikProps.errors.rol?.id}
                    </FormHelperText>
                  </FormControl>
                </Grid>

              </Grid>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={formikProps.isSubmitting}
                  sx={{ textTransform: "none", mb:4 }}
                >
                  Guardar Cambios
                </Button>
              </Box>
              {error && (
                <Typography color="error" variant="body1">
                  {error}
                </Typography>
              )}
            </Box>
          </Paper>
        </Form>
      )}
    </Formik>
  );
};

export default ModificarUsuarioForm;
