import * as React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { GlobalContext } from "../Context/GlobalContext";
import Loading from "../Components/Loading";
import {
  Button,
  Paper,
  CardMedia,
  Typography,
  Box,
  ImageList,
  ImageListItem,
  Rating,
  Dialog,
  MenuItem,
  Icon
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useContext, useEffect } from "react";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Calendar from "./Calendar";
import PoliciesList from "./PoliciesList";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import ShareIcon from '@mui/icons-material/Share';
import { Grid } from "react-loader-spinner";

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
  const policies = ["Buena Higiene", "Retorno de Instrumentos", ""];
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(null);
  const { state, dispatch } = useContext(GlobalContext);
  const isLogged = state.auth.isLogged;
  const [reserved, setReserved] = useState([]);
  const [reservedDates, setReservedDates] = React.useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error("Failed to fetch product.");
        }
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();

  }, [endpoint]);

  useEffect(() => {
    const fetchReservedDates = async (productoId) => {
      try {
        const response = await fetch(`http://3.145.94.82:8080/alquiler/producto/${productoId}/fechas`);
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error('Failed to fetch reserved dates');
      }
    };

    const fetchData = async () => {
      try {
        const data = await fetchReservedDates(product.id);
        setReserved(data);
      } catch (error) {
        console.error('Error fetching reserved dates:', error);
      }
    };

    if (product) {
      fetchData();
    }
  }, [product]);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
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



  return (
    <ThemeProvider theme={theme}>
      <Box className='contex-detalle'>
        <Paper className="paper" sx={{ boxShadow: "0 0 2px 2px #8f8f8f88", width: "0, auto" }}>
          <ImageList className="img-list" sx={{ display: 'flex', overflow: "hidden" }}>
            {itemData.slice(0, 4).map((item, index) => (
              <ImageListItem key={item.id}>
                <img style={{ border: "1px solid #8f8f8f88", width: "100%", height: "auto", maxHeight: "120px", objectFit: "contain" }}
                  src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
                  onClick={() => handleImageClick(index)}
                />
              </ImageListItem>
            ))}
          </ImageList>
          <CardMedia component="img" className="product-img" image={product.imagen} onClick={() => handleImageClick(0)} sx={{ display: 'flex', objectFit: "contain" }} />
          <Dialog open={open} onClose={handleClose}>
            <Carousel
              showArrows={true}
              showThumbs={false}
              className="custom-carousel"
              selectedItem={selectedImageIndex}
            >
              {itemData.map((item) => (
                <div key={item.id}>
                  <img
                    src={item.img}
                    style={{ width: "100%", height: "600px", objectFit: "contain" }}
                  />
                </div>
              ))}
            </Carousel>
          </Dialog>

          <Box className="box-text" sx={{ display: "flex", flexDirection: "column", gap: 1.5, textAlign: "center", }}>
            <Link className="botonadmin" to="">
              <MenuItem sx={{position:'absolute', top:'10em', right:'14vw', maxWidth:'100px'}}>
                <ShareIcon fontSize="small" />
              </MenuItem>
            </Link>
            <Typography className="nombre-detalle" variant="h4" sx={{ maxWidth: '22rem' }}>{product.nombre}</Typography>
            {isLogged && (
              <Box sx={{ display: "flex", justifyContent: 'center' }}>
                <Typography sx={{ textAlign: 'center' }}>
                  Puntuar
                </Typography>
                <Rating
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
              </Box>
            )}
            <Typography className="description" align="justify" sx={{ maxWidth: '22rem' }}>{product.descripcion}</Typography>
            <Box>
              <Typography variant="h6" fontWeight="bold" >Valor diario</Typography>
              <Typography variant="h6"> ${product.precio_x_dia} </Typography>
            </Box>
            <Button variant="contained" className="btn-add" sx={{ display: 'flex', justifyContent: 'center', alignItems: "center", textTransform: "none" }}>Rentar</Button>
            <Box component='h2' className="valor" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            </Box>
          </Box>

          <Box className='poli-fecha'>
            <Box>
              <PoliciesList />
            </Box>
            <Box>
              <Box className='text-fecha'>
                <Typography variant='h6' id='disponible' sx={{ letterSpacing: '3px', lineHeight: '1.5'}}>Fechas Disponibles</Typography>
              </Box>
              <Calendar fixed={true} reservedDates={reserved} />
            </Box>
          </Box>
          <Button className="btn-volver">
            <Link to='/' style={{ fontSize: 'large', fontWeight: 'bold', backgroundColor: '#16213e', borderRadius: '3px', color: '#ffffff', height: '1.5em', width: '5em', display: 'flex', justifyContent: 'center', alignItems: "center" }}><KeyboardReturnIcon /></Link>
          </Button>
        </Paper>
      </Box >
    </ThemeProvider >
  );
};

export default ProductoDetalle;