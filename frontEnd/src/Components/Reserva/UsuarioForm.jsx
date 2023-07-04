import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../../Context/GlobalContext";

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
  IconButton,

} from "@mui/material";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Loading from "../Loading";
import axios from "axios";
import "../../Style/UsuarioForm.css";
import swal from "sweetalert";




const validationSchema = Yup.object({
  nombre: Yup.string().required("El nombre es requerido"),
  apellido: Yup.string().required("El apellido es requerido"),
  email: Yup.string()
    .email("Formato de email inválido")
    .required("El email es requerido"),
  rol: Yup.object().shape({
    id: Yup.number().required("El rol es requerido"),
    nombre: Yup.string().required("El nombre del rol es requerido"),
  }),
  verificado: Yup.number().required("El estado de verificación es requerido"),
  dni: Yup.number().required("Ingresá tu documento").integer("El campo debe contener solo números enteros"),

  domicilio: Yup.string().required("Ingresá tu domicilio"),
  telefono: Yup.number().required("Ingresá tu teléfono"),
});

const UsuarioForm = () => {
  const { state } = useContext(GlobalContext);
  const usuarioId = state.auth.id;
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState(null);
  const [isEditingComplete, setIsEditingComplete] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/usuario/${usuarioId}`
        );
        const data = response.data;
        setUsuario(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUsuario();
  }, [usuarioId]);

  const handleSubmit = async (values, { setSubmitting }) => {
    const { rol, ...otherValues } = values;
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/usuario/modificar/${usuarioId}`,
        {
          ...otherValues,
          rol: {
            id: rol.id,
            nombre: rol.nombre,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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
    setIsEditingComplete(false);
  };
  if (loading) {
    return <Loading />;
  }

  if (isEditingComplete) {
    swal({
      icon: 'success',
      title: 'Usuario actualizado',
      text: `
        Nombre: ${usuario.nombre}
        Apellido: ${usuario.apellido}
        Email: ${usuario.email}
        DNI: ${usuario.dni}
        Teléfono: ${usuario.telefono}
        Domicilio: ${usuario.domicilio}
      `,
      closeOnClickOutside: false,
      className: 'my-swal',
    });
  }
  return (
    <Formik
      initialValues={{
        nombre: usuario.nombre || "",
        apellido: usuario.apellido || "",
        email: usuario.email || "",
        rol: {
          id: usuario.rol?.id || "", // Set the initial value to an empty string if undefined
          nombre: usuario.rol?.nombre || "",
        },
        verificado: usuario.verificado || 0,
        dni: usuario.dni || "",
        domicilio: usuario.domicilio || "",
        telefono: usuario.telefono || "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <Form>
       
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"              
            >
             
              <Grid
                container
                spacing={2}
                sx={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  
                }}
              >
                <Grid id="gridContainer" item xs={10}>
                  <TextField
                    className="usuarioFormField"
                    size="small"
                    label="Nombre (no editable)"
                    fullWidth
                    sx={{ marginTop: "4vh" }}
                    InputProps={{ readOnly: true }}
                    value={usuario.nombre}
                  />
                  <TextField
                    className="usuarioFormField"
                    size="small"
                    label="Apellido (no editable)"
                    fullWidth
                    sx={{ marginTop: "4vh" }}
                    InputProps={{ readOnly: true }}
                    value={usuario.apellido}
                  />
                  <TextField
                    className="usuarioFormField"
                    size="small"
                    label="Email (no editable)"
                    fullWidth
                    sx={{ marginTop: "4vh" }}
                    InputProps={{ readOnly: true }}
                    value={usuario.email}
                  />

                  <Field
                    className="usuarioFormField"
                    size="small"
                    as={TextField}
                    label="DNI"
                    name="dni"
                    id="dni"
                    type="number"
                    fullWidth
                    sx={{ marginTop: "4vh" }}
                  />
                  <ErrorMessage
                    name="dni"
                    component="div"
                    className="error-message"
                  />
                  <Field
                    className="usuarioFormField"
                    size="small"
                    as={TextField}
                    label="Teléfono"
                    name="telefono"
                    id="telefono"
                    type="number"
                    fullWidth
                    sx={{ marginTop: "4vh" }}
                  />
                  <ErrorMessage
                    name="telefono"
                    component="div"
                    className="error-message"
                  />
                  <Field
                    className="usuarioFormField"
                    size="small"
                    name="domicilio"
                    id="domicilio"
                    as={TextField}
                    label="Domicilio"
                    fullWidth
                    sx={{ marginTop: "4vh" }}
                  />
                  <ErrorMessage
                    name="domicilio"
                    component="div"
                    className="error-message"
                  />
                </Grid>
                <Grid item xs={6} sx={{ display: "none" }}>
                  <FormControl fullWidth sx={{ marginBottom: "4vh" }}>
                    <InputLabel>Rol</InputLabel>
                    <Field as={Select} name="rol.id" label="Rol" size="small">
                      <MenuItem value={1}>Usuario</MenuItem>
                      <MenuItem value={2}>Administrador</MenuItem>
                      {/* Add more MenuItem options as needed */}
                    </Field>
                    <ErrorMessage
                      name="rol.id"
                      component="div"
                      className="error-message"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6} sx={{ display: "none" }}>
                  <FormControl fullWidth sx={{ marginBottom: "4vh" }}>
                    <InputLabel>Verificado</InputLabel>
                    <Field
                      as={Select}
                      name="verificado"
                      label="verificado"
                      size="small"
                    >
                      <MenuItem value={0}>No</MenuItem>
                      <MenuItem value={1}>Si</MenuItem>
                      {/* Add more MenuItem options as needed */}
                    </Field>
                    <ErrorMessage
                      name="verificado"
                      component="div"
                      className="error-message"
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Button
                  variant="outlined"
                  type="submit"
                  disabled={formikProps.isSubmitting}
                  sx={{
                    textTransform: "none",
                    mt: "4vh",
                    mb: "2vh",
                  
                    color: "#16213e",
                    borderColor: "#16213e",
                    "&:hover": {
                      backgroundColor: "#16212e",
                      color:"white"
                    },
                  }}
                >
                  Actualizar Datos
                </Button>
              </Box>
              {error && (
                <Typography color="error" variant="body1">
                  {error}
                </Typography>
              )}
            </Box>
        
         
        </Form>
      )}
    </Formik>

  );
};

export default UsuarioForm;
