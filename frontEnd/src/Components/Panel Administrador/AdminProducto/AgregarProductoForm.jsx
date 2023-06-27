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
  Select,
  MenuItem,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import swal from "sweetalert";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const validationSchema = Yup.object({
  categoria_id: Yup.number()
    .typeError("La categoría debe ser un número")
    .required("La categoría es requerida"),
  nombre: Yup.string().trim().required("El nombre es requerido"),
  descripcion: Yup.string().required("La descripción es requerida"),
  imagenes: Yup.array().min(1, "Debe cargar al menos una imagen"),
   
  precio_x_dia: Yup.number()
    .typeError("El precio debe ser un número")
    .required("El precio es requerido"),

  stock: Yup.number()
    .typeError("El stock debe ser un número")
    .required("El stock es requerido"),
});
const initialValues = {
  nombre: "",
  descripcion: "",
  imagenes: "",
  precio_x_dia: "",
  categoria_id: "",
  stock: "",
};

const AgregarProductoForm = () => {
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState(null);

  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);

  const uploadImageFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const uploadResponse = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/s3/upload`,
      formData
    );
    const uploadData = uploadResponse.data;

    if (!uploadData.url) {
      console.error(
        uploadData.message || "An error occurred while uploading the image."
      );
      return null;
    }

    return uploadData.url;
  };
  const handleImageDelete = (index) => {
    const updatedUrls = [...uploadedImageUrls];
    updatedUrls.splice(index, 1);
    setUploadedImageUrls(updatedUrls);
  };

  const handleImageUpload = async (event, index) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = async () => {
      const imageUrl = await uploadImageFile(file); // Upload the image file

      setUploadedImageUrls((prevState) => {
        const updatedUrls = [...prevState];
        updatedUrls[index] = imageUrl; // Set the uploaded image URL
        return updatedUrls;
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const addNewImageUploadField = () => {
    setUploadedImageUrls((prevState) => [...prevState, ""]);
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const formData = {
        ...values,
        imagenes: [...uploadedImageUrls],
      };
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/producto/agregar`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(JSON.stringify(formData));
      if (response == 201) {
        throw new Error(response.data.message || "An error occurred.");
      }
      setProducto(response.data);
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
        buttons: false,
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
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/categoria/todas`
        );
        const data = response.data;
        setCategorias(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategorias();
  }, []);

  return (
    <Box sx={{ mt: "2vh" }}>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} lg={10}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, setFieldValue }) => (
              <Form>
                <Paper sx={{ padding: "5vh" }}>
                  <Typography variant="h5" sx={{ mb: 1, textAlign: "center" }}>
                    Agregar Producto
                  </Typography>

                  <Grid  container spacing={2} alignItems="center">
                    <Grid item xs={12}  md={6}>
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
                    <Grid item xs={12}  md={6}>
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
                    <Grid item xs={12}  md={6}>
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
                    <Grid item xs={12} md={6}>
                      <InputLabel htmlFor="stock">Stock</InputLabel>
                      <FormControl fullWidth sx={{ mb: 1 }}>
                        <Field
                          size="small"
                          as={TextField}
                          id="stock"
                          name="stock"
                          type="number"
                          error={errors.stock && touched.stock}
                        />
                        {errors.stock && touched.stock && (
                          <FormHelperText>{errors.stock}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} >
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
                    <Grid item xs={12} >
                      <InputLabel
                        htmlFor="imagenes"
                        sx={{ lineHeight: "2rem" , border:"groove  1px  #cacacc", borderTop:0, borderLeft:0, borderRight:0}}
                      >
                        Imagenes
                      </InputLabel>
                      <FormControl fullWidth sx={{ mb: 1 }}
                       id="imagenes"
                       name="imagenes">
                        {uploadedImageUrls.map((imageUrl, index) => (
                          <Grid 
                            container
                            spacing={2}
                            alignItems="center"
                            key={index}
                           
                          >
                            <Grid
                                item
                                xs={12} sm={2}
                                sx={{display:"flex",  justifyContent:"center", mt:"10px"}}
                              
                              >
                            {imageUrl ? (                              
                                <CardMedia
                                  component="img"
                                  src={imageUrl}
                                  alt="Product Image"
                                  sx={{
                                    width: "auto",
                                    height: "100px",
                                    maxWidth: "100px",
                                  }}
                                />                              
                            ):(
                              <CardMedia
                                  component="img"
                                  src="https://buckets3-harmonyrentals-img.s3.us-east-2.amazonaws.com/1687746128806_horn-trumpet-icon-musical-instrument-isolated-white-background-royal-fanfare-play-music-vector-illustration_342166-353.avif"
                                  alt="Product Image"
                                  sx={{
                                    width: "auto",
                                    height: "100px",
                                    
                                  }}
                                />                    
                            )}
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              sm={8}
                              
                              sx={{
                                textAlign: "left",
                                display: "flex",
                                alignItems: "center",
                                mt: "10px",
                              }}
                            >
                              <InputLabel
                                htmlFor={`imagenes-${index}`}
                              ></InputLabel>
                              <FormControl fullWidth sx={{}}>
                                <TextField
                                  size="small"
                                  id={`imagenes-${index}`}
                                  name={`imagen-${index}`}
                                  type="text"
                                  placeholder="Cargar imagen de producto"
                                  value={imageUrl || ""}
                                  onChange={(event) =>
                                    handleImageUpload(event, index)
                                  }
                                />
                              </FormControl>
                            </Grid>
                            <Grid
                              item
                              xs={7} sm={1}                             
                              sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
                            >
                              <label htmlFor={`upload-image-${index}`}>
                                <input
                                  style={{ display: "none" }}
                                  type="file"
                                  value=""
                                  accept="image/*"
                                  id={`upload-image-${index}`}
                                  onChange={(event) =>
                                    handleImageUpload(event, index)
                                  }
                                />
                                <Tooltip
                                  title="Agregar imagen de producto"
                                  placement="bottom"
                                >
                                  <IconButton
                                    component="span"
                                    variant="contained"
                                    sx={{
                                      textTransform: "none",
                                      color: "#16213E",
                                    }}
                                  >
                                    <CloudUploadIcon />
                                  </IconButton>
                                </Tooltip>
                              </label>
                            </Grid>
                            <Grid
                              item
                              xs={1}
                              sm={1}
                              sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
                            >
                              <Tooltip
                                title="Eliminar imagen"
                                placement="bottom"
                              >
                                <IconButton
                                  onClick={() => handleImageDelete(index)}
                                  component="span"
                                  variant="contained"
                                  sx={{ textTransform: "none", color: "#CC0000" }}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                            </Grid>
                          </Grid>
                        ))}
                      </FormControl>
                      {errors.imagenes && touched.imagenes && (
                        <FormHelperText>{errors.imagenes}</FormHelperText>
                      )}
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      sx={{
                        display: "flex",
                        justifyContent: "left",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        variant="text"
                        sx={{ backgroundColor: "#c7c7c7ca" }}
                        onClick={addNewImageUploadField}
                      >
                        +
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    spacing={2}
                    justifyContent="flex-end"
                    sx={{ mt: 2 }}
                  >
                    <Grid
                      item
                      xs={12}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Button type="submit" variant="contained" color="primary"
                      disabled={uploadedImageUrls.length === 0} >
                        Agregar Producto
                      </Button>
                    </Grid>
                  </Grid>
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
