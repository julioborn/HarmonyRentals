import { useContext, useState } from "react";
import { GlobalContext } from "../Context/GlobalContext";
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
    Card,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";


const validationSchema = Yup.object({
    email: Yup.string().email("Formato de email inválido").required("El email es requerido"),
    usuario: Yup.string().required("El usuario es requerido"),
    nombre: Yup.string().required("El nombre es requerido"),
    documento: Yup.number().required("El documento es requerida"),
    phone: Yup.number().required("El numero ce teléfono es requerido"),
    direccion: Yup.string().required("La dirección es requerida"),

});
const initialValues = {
    email: "",
    usuario: "",
    nombre: "",
    documento: "",
    phone: "",
    direccion: "",
};

const MisDatos = () => {
    const [usuario, setUsuario] = useState(null);
    const [error, setError] = useState(null);

    const { state, dispach } = useContext(GlobalContext);
    const nombreUsuario = state.auth.nombre;
    const apellidoUsuario = state.auth.apellido;
    const Usuario = state.auth.usuario;

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/usuario/agregar`, values, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const responseData = response.data;
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
                buttons: false,
            });
        }
    };

    return (
        <Box sx={{ mt: 12, mb: 8, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Grid container spacing={4} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center" }}>
                <Grid item xs={12} sm={6}>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                        {({ errors, touched }) => (
                            <Form>
                                <Paper sx={{ padding: "5vh" }}>
                                    <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>Mis Datos</Typography>
                                    <Typography variant="h6" sx={{ mb: 1 }}>Datos de cuenta</Typography>
                                    <Box sx={{ display: 'flex', gap: '5em', mb: 1, height: '2.5em', width: '100%', boxShadow: '0px 0px 2px -1px' }}>
                                        <Typography sx={{ display: 'flex', alignItems: 'center', color: '#838383 ', ml: '10px', width: ' 15%' }} >Nombre:  </Typography>
                                        <Typography sx={{ display: 'flex', alignItems: 'center', fontSize: '17.5px' }}>{nombreUsuario}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', gap: '5em', mb: 1, height: '2.5em', width: '100%', boxShadow: '0px 0px 2px -1px' }}>
                                        <Typography sx={{ display: 'flex', alignItems: 'center', color: '#838383 ', ml: '10px', width: ' 15%' }} >Apellido:  </Typography>
                                        <Typography sx={{ display: 'flex', alignItems: 'center', fontSize: '17.5px' }}>{apellidoUsuario}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', gap: '5em', mb: 3, height: '2.5em', width: '100%', boxShadow: '0px 0px 2px -1px' }}>
                                        <Typography sx={{ display: 'flex', alignItems: 'center', color: '#838383 ', ml: '10px', width: ' 15%' }} >Email:   </Typography>
                                        <Typography sx={{ display: 'flex', alignItems: 'center', fontSize: '17.5px' }}>{Usuario}</Typography>
                                    </Box>
                                    <Typography variant="h6" sx={{ mb: 1, mt: 5 }}>Datos Personales</Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={12}>
                                            <InputLabel htmlFor="nombre">Nombre completo</InputLabel>
                                            <FormControl fullWidth sx={{ mb: 1 }}>
                                                <Field as={TextField} id="nombre" name="nombre" size="small" error={errors.nombre && touched.nombre} />
                                                {errors.nombre && touched.nombre && <FormHelperText>{errors.nombre}</FormHelperText>}
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={12}>
                                            <InputLabel htmlFor="documento">N°. Documento</InputLabel>
                                            <FormControl fullWidth sx={{ mb: 1 }}>
                                                <Field as={TextField} id="documento" name="documento" type="documento" size="small" error={errors.documento && touched.documento} />
                                                {errors.documento && touched.documento && <FormHelperText>{errors.documento}</FormHelperText>}
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={12}>
                                            <InputLabel htmlFor="direccion">Dirección</InputLabel>
                                            <FormControl fullWidth sx={{ mb: 1 }}>
                                                <Field as={TextField} id="direccion" name="direccion" size="small" error={errors.direccion && touched.direccion} />
                                                {errors.direccion && touched.direccion && <FormHelperText>{errors.direccion}</FormHelperText>}
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={12}>
                                            <InputLabel htmlFor="phone">Teléfono</InputLabel>
                                            <FormControl fullWidth sx={{ mb: 1 }}>
                                                <Field as={TextField} id="phone" name="phone" type="phone" size="small" error={errors.telefono && touched.telefono} />
                                                {errors.telefono && touched.telefono && <FormHelperText>{errors.telefonoo}</FormHelperText>}
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                        <Button variant="contained" color="primary" type="submit"
                                            sx={{
                                                fontSize: "15px",
                                                textTransform: "none",
                                                backgroundColor: "#16213e",
                                                "&:hover": {
                                                    backgroundColor: "#283047"
                                                },
                                                width: 280
                                            }}>
                                            Agregar
                                        </Button>
                                    </Box>
                                </Paper>
                            </Form>
                        )}
                    </Formik>
                </Grid>
            </Grid>
        </Box>
    );
};

export default MisDatos
