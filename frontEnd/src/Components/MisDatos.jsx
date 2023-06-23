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

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {};
    return (
        <Box sx={{ mt: "10vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Grid container spacing={4} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center" }}>
                <Grid item xs={12} sm={6}>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                        {({ errors, touched }) => (
                            <Form>
                                <Paper sx={{ padding: "5vh" }}>
                                    <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>Mis Datos</Typography>
                                    <Typography variant="h6" sx={{ mb: 1 }}>Datos de cuenta</Typography>
                                    <Grid item xs={12} sm={12}>
                                        <InputLabel htmlFor="email">E-mail</InputLabel>
                                        <FormControl fullWidth sx={{ mb: 1 }}>
                                            <Field as={TextField} id="email" name="email" size="small" error={errors.email && touched.email} />
                                            {errors.email && touched.email && <FormHelperText>{errors.email}</FormHelperText>}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <InputLabel htmlFor="usuario">Usuario</InputLabel>
                                        <FormControl fullWidth sx={{ mb: 1 }}>
                                            <Field as={TextField} id="usuario" name="usuario" size="small" error={errors.usuario && touched.usuario} />
                                            {errors.usuario && touched.usuario && <FormHelperText>{errors.usuario}</FormHelperText>}
                                        </FormControl>
                                    </Grid>

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
                                            <InputLabel htmlFor="phone">Teléfono</InputLabel>
                                            <FormControl fullWidth sx={{ mb: 1 }}>
                                                <Field as={TextField} id="phone" name="phone" type="phone" size="small" error={errors.telefono && touched.telefono} />
                                                {errors.telefono && touched.telefono && <FormHelperText>{errors.telefonoo}</FormHelperText>}
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={12}>
                                            <InputLabel htmlFor="direccion">Dirección</InputLabel>
                                            <FormControl fullWidth sx={{ mb: 1 }}>
                                                <Field as={TextField} id="direccion" name="direccion" size="small" error={errors.direccion && touched.direccion} />
                                                {errors.direccion && touched.direccion && <FormHelperText>{errors.direccion}</FormHelperText>}
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                        <Button variant="contained" color="primary" type="submit" sx={{ marginTop: 3, textTransform: "none" }}>
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