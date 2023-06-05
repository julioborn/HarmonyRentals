import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GlobalContext } from "../Context/GlobalContext";
import Loading from "../Components/Loading";
import {
  Button,
  Paper,
  CardMedia,
  CardContent,
  Typography,
  Box,
  ImageList,
  ImageListItem,
  Rating,
  Grid,
  Dialog,
  Container,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import { useState, useContext } from "react";
import styled from "@emotion/styled";

const theme = createTheme({
  palette: {
    primary: {
      main: "#16213E",
    },
  },
});

const ProductoDetalle = () => {
  const { id } = useParams();
  const endpoint = `http://3.145.94.82:8080/producto/${id}`;
  const [product, setProduct] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [showAllImages, setShowAllImages] = useState(false);
  const { state, dispatch } = useContext(GlobalContext);
  const isLogged = state.auth.isLogged;

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error("Failed to fetch product.");
        }
        const data = await response.json();
        setProduct(data);
        console.log(data)
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();

  }, [endpoint]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (loading) {
    return <Loading containerHeight={"100vh"} />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }
  const itemData = [
    {
      id: 1,
      img: product.imagen,
    },
    {
      id: 2,
      img: product.imagen2,
    },
    {
      id: 3,
      img: product.imagen3,
    },
    {
      id: 4,
      img: product.imagen4,
    },
    {
      id: 5,
      img: product.imagen4,
    },
  ];

  const handleShowAllImages = () => {
    setShowAllImages(true);
  };
  const handleToggleImages = () => {
    setShowAllImages(!showAllImages);
  };



  return (
    <Box className='contex-detalle'>
      <Paper className="paper">
        <ThemeProvider theme={theme}>

          <ImageList className="img-list" sx={{ display: 'flex', objectFit: "contain", }}>
            {showAllImages
              ? itemData.map((item) => (
                <ImageListItem key={item.id}>
                  <img
                    src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                    srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.title}
                    loading="lazy"
                    onClick={() => handleImageClick(item.img)}
                  />
                </ImageListItem>
              ))
              : itemData.slice(0, 4).map((item) => (
                <ImageListItem key={item.id}>
                  <img
                    src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                    srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.title}
                    loading="lazy"
                    onClick={() => handleImageClick(item.img)}
                  />
                </ImageListItem>
              ))}

            {itemData.length >= 5 && (
              <Button size="small" className="btn-add" onClick={handleToggleImages}>
                {showAllImages ? "Ver menos" : "Ver más"}
              </Button>
            )}
          </ImageList>

          <CardMedia component="img" className="product-img" image={product.imagen} onClick={() => handleImageClick(product.imagen)} sx={{ display: 'flex', objectFit: "contain", }} />

          <Box className='btn-volver'>
            <Button className="volver" onClick={() => navigate(-1)}>
              <KeyboardBackspaceRoundedIcon />
              Volver
            </Button>
          </Box>
        </ThemeProvider>
        <Dialog open={open} onClose={handleClose}>
          <img
            src={selectedImage}
            alt="Ampliación de imagen"
            style={{ width: "100%", height: "auto" }}
          />
        </Dialog>

        <Box className='contex-texto'>
          <Typography variant="h5" sx={{ maxWidth: '22rem' }}>{product.nombre}</Typography>
          <Typography variant="body1" sx={{ maxWidth: '22rem' }}>{product.descripcion}</Typography>
          <Button variant="contained" sx={{ display: 'flex', justifyContent: 'center', maxWidth: '22rem' }}>Adquirir</Button>
        </Box>

        <Box component='h2' sx={{ mr: 9, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          ${product.precio_x_dia}

          <Typography sx={{ maxWidth: '10rem', }}>Valor diario</Typography>
          {isLogged && (
            <Typography sx={{ display: "flex", flexDirection: 'column', justifyContent: "center", maxWidth: '8rem', fontSize: '14px', textAlign: 'center' }}>
              Puntuar producto:
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
            </Typography>
          )}
        </Box>

      </Paper>
    </Box >
  );





  // return (
  //   <Box
  //     sx={{
  //       display: "flex",
  //       alignItems: "center",
  //       justifyContent: "center",
  //       mt: "20vh",
  //     }}
  //   >
  //     <ThemeProvider theme={theme}>
  //       <Paper sx={{ padding: "2em", height: "auto", width: "60vw" }}>
  //         <Grid
  //           container
  //           spacing={2}
  //           sx={{
  //             display: "flex",
  //             alignItems: "center",
  //             justifyContent: "space-evenly",
  //             height: "100%",
  //           }}
  //         >
  //           <Grid
  //             item
  //             xs={6}
  //             sx={{
  //               height: "100%",
  //               display: "flex",
  //               flexDirection: "column",
  //               alignItems: "center",
  //               justifyContent: "center"
  //             }}
  //           >
  //             <Typography
  //               variant="h4"
  //               color="primary"
  //               sx={{ textAlign: "center", mb: "3vh" }}
  //             >
  //               {product.nombre}
  //             </Typography>
  //             <Typography
  //               sx={{ textAlign: "center", color: "gray", mb: "2vh" }}
  //             >
  //               {product.descripcion}
  //             </Typography>
  //             <Box
  //               sx={{ display: "flex", justifyContent: "center", mb: "2vh" }}
  //             >
  //               <Typography>Valor diario: $</Typography>
  //               <Typography>{product.precio_x_dia}</Typography>
  //             </Box>
  //             <Box>
  //               {isLogged && (
  //                 <Typography
  //                   sx={{ display: "flex", justifyContent: "center", mb: "2vh" }}
  //                 >
  //                   Puntuar producto:
  //                   <Rating
  //                     name="simple-controlled"
  //                     value={value}
  //                     onChange={(event, newValue) => {
  //                       setValue(newValue);
  //                     }}
  //                   />
  //                 </Typography>
  //               )}
  //             </Box>
  //           </Grid>
  //           <Grid
  //             item
  //             xs={6}
  //             sx={{
  //               display: "flex",
  //               flexDirection: "column",
  //               justifyContent: "center",
  //               alignItems: "center",
  //             }}
  //           >
  //             <Box
  //               sx={{
  //                 display: "flex",
  //                 flexDirection: "column",
  //                 justifyContent: "center",
  //                 alignItems: "center",
  //               }}
  //             >
  //               <CardMedia
  //                 component="img"
  //                 image={product.imagen}
  //                 sx={{
  //                   minWidth: "20%",
  //                   maxHeight: "230px",
  //                   alignItems: "center",
  //                   objectFit: "contain",
  //                   borderRadius: 1,
  //                   cursor: "pointer",
  //                   transition: "transform 0.3s ease-in-out",
  //                   "&:hover": {
  //                     transform: "scale(1.2)",
  //                   },
  //                 }}
  //                 onClick={() => handleImageClick(product.imagen)}
  //               />
  //               <ImageList
  //                 sx={{
  //                   width: "70%",
  //                   alignContent: "center",
  //                   cursor: "pointer",
  //                   borderRadius: 1,
  //                   mt: 5,
  //                 }}
  //                 cols={4}
  //                 rowHeight={"auto"}
  //               >
  //                 {showAllImages
  //                   ? itemData.map((item) => (
  //                     <ImageListItem key={item.id}>
  //                       <img
  //                         src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
  //                         srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
  //                         alt={item.title}
  //                         loading="lazy"
  //                         onClick={() => handleImageClick(item.img)}
  //                       />
  //                     </ImageListItem>
  //                   ))
  //                   : itemData.slice(0, 4).map((item) => (
  //                     <ImageListItem key={item.id}>
  //                       <img
  //                         src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
  //                         srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
  //                         alt={item.title}
  //                         loading="lazy"
  //                         onClick={() => handleImageClick(item.img)}
  //                       />
  //                     </ImageListItem>
  //                   ))}
  //               </ImageList>
  //               {itemData.length >= 5 && (
  //                 <Button
  //                   size="small"
  //                   sx={{ textTransform: "none", color: "#16213e", mt: 2 }}
  //                   onClick={handleToggleImages}
  //                 >
  //                   {showAllImages ? "Ver menos" : "Ver más"}
  //                 </Button>
  //               )}
  //             </Box>
  //           </Grid>
  //           <Box sx={{ width: "100%", textAlign: "right" }}>
  //             <Button
  //               sx={{
  //                 textTransform: "none",
  //                 fontSize: 16,
  //                 backgroundColor: "#E0E0E0",
  //               }}
  //               onClick={() => navigate(-1)}
  //             >
  //               <KeyboardBackspaceRoundedIcon />
  //               Volver
  //             </Button>
  //           </Box>
  //         </Grid>
  //       </Paper>
  //     </ThemeProvider>
  //     <Dialog open={open} onClose={handleClose}>
  //       <img
  //         src={selectedImage}
  //         alt="Ampliación de imagen"
  //         style={{ width: "100%", height: "auto" }}
  //       />
  //     </Dialog>
  //   </Box>
  // );
};

export default ProductoDetalle;
