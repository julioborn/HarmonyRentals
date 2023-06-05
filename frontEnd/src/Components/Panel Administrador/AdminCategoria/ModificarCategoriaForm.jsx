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
import Loading from "../../Loading";

const validationSchema = Yup.object({
  nombre: Yup.string().required("El nombre es requerido"),
  descripcion: Yup.string().required("La descripción es requerida"),
  imagen: Yup.string(),
  
});

const ModificarCategoriaForm = ({ categoriaId }) => {
  const [categoria, setCategoria] = useState(null);
  const [error, setError] = useState(null);
  const [isEditingComplete, setIsEditingComplete] = useState(false);
  
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCategoria = async () => {
      try {
        const response = await fetch(
          `http://3.145.94.82:8080/categoria/${categoriaId}`
        );
        const data = await response.json();
        setCategoria(data);       
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchCategoria();
  }, [categoriaId]);

  const handleSubmit = async (values, { setSubmitting }) => {
    const { ...otherValues } = values;
    try {
      const response = await fetch(
        `http://3.145.94.82:8080/categoria/modificar/${categoriaId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...otherValues           
          }),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || "An error occurred.");
      }
      setCategoria(responseData);
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
    setCategoria(null);
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
      <Grid container spacing={2} sx={{ marginTop: "3vh" , display:"flex", justifyContent:"center"}}>
         
      <Paper elevation={3} sx={{ p: 2 , display:"flex", justifyContent:"center", alignItems:"center"}}>
      <Grid item xs={6} >
        <Typography variant="h6">Categoria modificada</Typography>
        <Typography variant="body1">Nombre: {categoria.nombre}</Typography>
        <Typography variant="body1">
          Descripción: {categoria.descripcion}
        </Typography>
      
        </Grid>
        <Grid item xs={6}>
              <Box  sx={{display:"flex",alignItems:"center", justifyContent:"center"}}>
                {/* Image Display */}
                {categoria.imagen && (
                  <img
                    src={categoria.imagen}
                    alt="Imagen de la categoria"
                    style={{ width: "auto", height: "200px", marginBottom: "1rem" }}
                  />
                )}

                {/* Additional Pictures Frames */}
                <Grid container spacing={1}>
                  {images.slice(0, 4).map((image, index) => (
                    <Grid item key={index} xs={3}>
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Imagenes Categoria ${index + 1}`}
                        style={{  height: "100px",width: "auto" }}
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
        nombre: categoria.nombre || "",
        descripcion: categoria.descripcion || "",
        imagen: categoria.imagen || ""       
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <Form>
          <Paper elevation={3} sx={{ p: 4, pt: 0 }}>
            {/*
            <Box display="flex" justifyContent="flex-end">
              <IconButton onClick={handleClose} sx={{  }}>
                <CloseIcon />
              </IconButton>
            </Box>
            */}
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              height="100%"
            >
              <Typography variant="h5" sx={{ mt: 3 }}>
                Modificar categoria
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
                    rows={3}
                    rowsMax={5}
                    label="Descripción"
                    fullWidth
                    sx={{ marginBottom: "3vh" }}
                  />
                </Grid>
                <Grid item xs={6}>
                 
                  <Field
                    name="imagen"
                    as={TextField}
                    label="Imagen"
                    fullWidth
                    sx={{ marginBottom: "3vh" }}
                  />
                  {formikProps.values.imagen && (
                    <img
                      src={formikProps.values.imagen}
                      alt="imagen Categoria"
                      style={{ width: "auto", height: "100px" }}
                    />
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                  />
                  {images.slice(0, 5).map((image, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(image)}
                      alt={`Product Image ${index + 1}`}
                      style={{ width: "auto", height: "100px" }}
                    />
                  ))}
                </Grid>
              </Grid>
              <Box mt={3} display="flex" justifyContent="center">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={formikProps.isSubmitting}
                >
                  Guardar cambios
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

export default ModificarCategoriaForm;
