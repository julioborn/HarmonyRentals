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
  FormHelperText,
  Tooltip,
  
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Loading from "../../Loading";
import "../PanelAdmin.css";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";

const validationSchema = Yup.object({
  nombre: Yup.string().required("El nombre es requerido"),
  descripcion: Yup.string().required("La descripción es requerida"),
  imagenes: Yup.array().test(
    "has-images",
    "Debe proporcionar al menos una imagen",
    (value) => value && value.length > 0
  ),
  precio_x_dia: Yup.number().required("El precio por día es requerido"),
  stock: Yup.number().required("El stock es requerido"),
  categoria_id: Yup.number().required("El ID de la categoría es requerido"),
});

const NewModificarProductoForm = ({ producto }) => {
   const [productoEditado, setProductoEditado] = useState(null);
  const [error, setError] = useState(null);
  const [isEditingComplete, setIsEditingComplete] = useState(false);
  const [formImages, setFormImages] = useState(producto.imagenes);
  const [loading, setLoading] = useState(false);
  const [loadingCategorias, setLoadingCategorias] = useState(true);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/categoria/todas`
        );
        const data = response.data;
        setCategorias(data);
        setLoadingCategorias(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoadingCategorias(false);
      }
    };
    fetchCategorias();
  }, []);
  /*
  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/producto/${producto.id}`
        );
        const data = response.data;
        setProducto(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProducto();
  }, [producto.id]);
*/
  const handleSubmit = async (values,{ setSubmitting }) => {
    const { ...otherValues } = values;
    try {

      //const token = sessionStorage.getItem("token");
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/producto/modificar/${producto.id}`,

        {
          ...otherValues,
          imagenes: formImages,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const responseData = response.data;
      if (!response.status==200) {
        throw new Error(responseData.message || "An error occurred.");
      }
      setProductoEditado(responseData);
      setIsEditingComplete(true);
      setError(null);
    } catch (error) {
      setError(error.message || "An error occurred. Please try again.");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };
  /*
  const handleClose = () => {
    setProducto(null);
  };
*/

const handleDeleteImage = (index) => {
  setFormImages((prevImages) => {
    const updatedImages = [...prevImages];
    updatedImages.splice(index, 1);
    
    
    return updatedImages;
  });
};
useEffect(() => {
  console.log(formImages);
}, [formImages]);


  const handleImageUpload = (event) => {
    const newImages = Array.from(event.target.files);
    formikProps.setFieldValue("imagenes", newImages);
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
          <Grid item xs={6}>
            <Typography variant="h6">Producto modificado</Typography>
            <Typography variant="body1">Nombre: {producto.nombre}</Typography>
            <Typography variant="body1">
              Descripción: {producto.descripcion}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Box
              className="prod-box"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                flexDirection: "column",
              }}
            >
              {producto.imagenes.map((imagen, index) => (
                <img
                  key={index}
                  src={imagen}
                  alt="Imagen del producto"
                  style={{
                    width: "100px",
                    height: index === 0 ? "200px" : "60px",
                    marginBottom: "1rem",
                  }}
                />
              ))}
              {/* Additional Pictures Frames */}
              <Grid container spacing={1}>
                {producto.imagenes.slice(0, 4).map((image, index) => (
                  <Grid item key={index} xs={3}>
                    <img
                      src={image}
                      alt={`Imágenes del producto ${index + 1}`}
                      style={{ height: "100px", width: "100px" }}
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
        imagenes: producto.imagenes || [],
        precio_x_dia: producto.precio_x_dia || 0,
        stock: producto.stock || 0,
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
                Modificar Producto
              </Typography>

              <Grid container spacing={2} sx={{ marginTop: "3vh" }}>
                <Grid item xs={12}>
                  <Field
                    size="small"
                    name="nombre"
                    id="nombre"
                    as={TextField}
                    label="Nombre"
                    fullWidth
                    sx={{ marginBottom: "3vh" }}
                  />
                  <Field
                    as={TextField}
                    size="small"
                    name="descripcion"
                    id="descripcion"
                    multiline
                    rows={6}
                    rowsmax={8}
                    label="Descripción"
                    fullWidth
                    sx={{ marginBottom: "3vh" }}
                  />
                  <Field
                    size="small"
                    name="precio_x_dia"
                    id="precio_x_dia"
                    as={TextField}
                    type="number"
                    label="Precio por día"
                    fullWidth
                    sx={{ marginBottom: "3vh" }}
                  />
                  <FormControl fullWidth sx={{ marginBottom: "3vh" }}>
                    <InputLabel id="categoria-label">Categoría</InputLabel>
                    <Field
                      size="small"
                      name="categoria_id"
                      id="categoria_id"
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

                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                 <Box
  sx={{
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  }}
>
{formikProps.values.imagenes &&
    formikProps.values.imagenes.map((url, index) => (
      <div key={index} style={{ position: "relative" }}>
        <img
          src={url}
          
          alt="Imagen del producto"
          style={{
            maxWidth: "100px",
            height: "auto",
            marginBottom: "8px",
            flex: "0 0 calc(20% - 10px)",
          }}
        />
        <Tooltip title="Se eliminará esta imagen" placement="bottom">
          <div
            style={{
              position: "absolute",
              top: "-15px",
              right: "-15px",
              cursor: "pointer",
            }}
            
          >
            <DeleteIcon 
            style={{
              fontSize: "16px",
              color: "red",
            }}
            onClick={() => handleDeleteImage(index)} // Replace handleDeleteImage with your own function to handle image deletion
            />
          </div>
        </Tooltip>
      </div>
    ))}
</Box>









                 
                 
                </Grid>
              </Grid>

              <Button
                name="submit"
                type="submit"
                variant="contained"
                color="primary"
                disabled={formikProps.isSubmitting}
                sx={{ textTransform: "none" }}
              >
                Guardar cambios
              </Button>
            </Box>
          </Paper>
        </Form>
      )}
    </Formik>
  );
};

export default NewModificarProductoForm;
