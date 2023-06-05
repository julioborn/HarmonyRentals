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
  precio_x_dia: Yup.number()
    .typeError("El precio debe ser un número")
    .required("El precio es requerido"),
  categoria_id: Yup.number()
    .typeError("La categoría debe ser un número")
    .required("La categoría es requerida"),
});

const ModificarProductoForm = ({ productId }) => {
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState(null);
  const [isEditingComplete, setIsEditingComplete] = useState(false);
  const [loadingCategorias, setLoadingCategorias] = useState(true);
  const [selectedCategoria, setSelectedCategoria] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/producto/${productId}`
        );
        const data = await response.json();
        setProducto(data);
        // Fetch the category details
        const categoriaResponse = await fetch(
          `http://localhost:8080/categoria/${data.categoria_id}`
        );
        const categoriaData = await categoriaResponse.json();
        setSelectedCategoria(categoriaData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProducto();
  }, [productId]);

  const handleSubmit = async (values, { setSubmitting }) => {
    const { categoria_id, ...otherValues } = values;
    try {
      const response = await fetch(
        `http://localhost:8080/producto/modificar/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...otherValues,
            categoria_id: parseInt(categoria_id),
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
  const handleImageUpload = (event) => {
    const newImages = Array.from(event.target.files);
    setImages(newImages);
  };

  if (!producto) {
    return <Loading />;
  }

  if (isEditingComplete && !loadingCategorias) {
    return (
      <Grid container spacing={2} sx={{ marginTop: "3vh" }}>
         
      <Paper elevation={3} sx={{ p: 2 , display:"flex"}}>
      <Grid item xs={6}>
        <Typography variant="h6">Producto modificado exitosamente</Typography>
        <Typography variant="body1">Nombre: {producto.nombre}</Typography>
        <Typography variant="body1">
          Precio / Día: {producto.precio_x_dia}
        </Typography>
        <Typography variant="body1">
          Categoría: {selectedCategoria ? selectedCategoria.nombre : ""}
        </Typography>
        <Typography variant="body1">
          Descripción: {producto.descripcion}
        </Typography>
      
        </Grid>
        <Grid item xs={6}>
              <Box display="flex" flexDirection="column" alignItems="center">
                {/* Image Display */}
                {producto.imagen && (
                  <img
                    src={producto.imagen}
                    alt="Product Image"
                    style={{ width: "auto", height: "200px", marginBottom: "1rem" }}
                  />
                )}

                {/* Additional Pictures Frames */}
                <Grid container spacing={1}>
                  {images.slice(0, 4).map((image, index) => (
                    <Grid item key={index} xs={3}>
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Product Image ${index + 1}`}
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
        nombre: producto.nombre || "",
        descripcion: producto.descripcion || "",
        imagen: producto.imagen || "",
        precio_x_dia: producto.precio_x_dia || "",
        categoria_id: producto.categoria_id || "",
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
                    name="precio_x_dia"
                    as={TextField}
                    type="number"
                    label="Precio / Día"
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
                      alt="Product Image"
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

export default ModificarProductoForm;
