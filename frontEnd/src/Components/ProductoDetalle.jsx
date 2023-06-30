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
  Checkbox,
  ListItem,
  List,
  Popover,
  Skeleton,
  Grid,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useContext, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Calendar from "./Calendar";
import PoliciesList from "./PoliciesList";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import ShareIcon from "@mui/icons-material/Share";
import "../Style/ProductoDetalle.css";
import swal from "sweetalert";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import TraceMapa from "./Map";
import PlaceIcon from "@mui/icons-material/Place";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";

import axios from "axios";
import { width } from "@mui/system";

const ProductoDetalle = () => {
  const { id } = useParams();
  const endpoint = `${import.meta.env.VITE_BACKEND_URL}/producto/${id}`;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [mostrarMapa, setMostrarMapa] = useState(false);
  const mapRef = React.useRef(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const { state, dispatch } = useContext(GlobalContext);
  const isLogged = state.auth.isLogged;
  const [reserved, setReserved] = useState([]);
  const [fechaDesde, setFechaDesde] = useState(null);
  const [fechaHasta, setFechaHasta] = useState(null);
  //const [verRentarProductoComponent, setVerRentarProductoComponent] = useState(false);
  const [isProductFavorite, setIsProductFavorite] = useState(false);
  const [colorIcono, setColorIcono] = useState("#c7c7c7");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [puntaje, setPuntaje] = useState(null);
  const [puntuacion, setPuntuacion] = useState(0);
  const [puntuacionPrevia, setPuntuacionPrevia] = useState(null);
  const [loadingPuntuacion, setLoadingPuntuacion] = useState(true);
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
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL
          }/alquiler/producto/${productoId}/fechas`
        );
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error("Failed to fetch reserved dates");
      }
    };
    const fetchData = async () => {
      try {
        const data = await fetchReservedDates(product.id);
        setReserved(data);
      } catch (error) {
        console.error("Error fetching reserved dates:", error);
      }
    };
    if (product) {
      fetchData();
    }
  }, [product]);

  //useEffect para obtener puntuacion previa

  useEffect(() => {
    const chequearPuntuacion = async () => {
      const params = new URLSearchParams();
      params.append("usuario_id", state.auth.id);
      params.append("producto_id", product.id);
      setLoadingPuntuacion(true);
      try {
        const token = localStorage.getItem("token"); // Retrieve the token from local storage
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL
          }/puntuacion/chequearPuntuacion?${params.toString()}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          const { puntajePrevio } = response.data;
          setPuntuacionPrevia(response.data);
          //   console.log(response.data);
          return puntajePrevio;
        } else {
          return null;
        }
      } catch (error) {
        return null;
      }
    };

    product && chequearPuntuacion();
  }, [product]);



  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        if (state.auth.isLogged) {
          const usuarioId = state.auth.id;
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL
            }/favoritos/${usuarioId}/producto/${product.id}`
          );
          if (response.status === 200) {
            const favorito = response.data;
            setIsProductFavorite(!!favorito);
          } else {
            setIsProductFavorite(false);
          }
        } else {
          setIsProductFavorite(false);
        }
      } catch (error) {
        //  console.error('Error:', error);
        setIsProductFavorite(false);
      }
    };
    checkFavoriteStatus();
  });

  const theme = createTheme({
    palette: {
      primary: {
        main: "#16213E",
      },
      secondary: {
        main: "#e94560",
      },
    },
  });

  useEffect(() => {
    const fetchPuntaje = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL
          }/puntuacion/producto?producto_id=${product.id}`
        );
        if (response.status === 200) {
          const { puntaje } = response.data;
          setPuntaje(puntaje);
        } else {
          setPuntaje(null);
        }
      } catch (error) {
        setPuntaje(null);
      }
    };
    product && fetchPuntaje();
  }, [product?.id]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl(null);
  };
  const open2 = Boolean(anchorEl);
  const id2 = open2 ? "social.share.popover" : undefined;
  const handleShareEmail = () => {
    const subject = "¡Echa un vistazo a esta increíble aplicación!";
    const body = `¡Hola! Me gustaría compartir contigo esta increíble aplicación que encontré: ${appUrl}`;
    const shareUrl = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.open(shareUrl);
    handleClose();
  };

  const handleToggleFavorite = () => {
    if (state.auth.isLogged) {
      const usuarioId = state.auth.id;
      const productoId = product.id;
      const favoritoExistente = state.favorites.find(
        (favorito) => favorito.producto_id === productoId
      );
      if (favoritoExistente) {
        //alert('El producto ya está en favoritos');
        return;
      }
      const favorito = {
        usuario_id: usuarioId,
        producto_id: productoId,
      };
      const url = new URL(
        `${import.meta.env.VITE_BACKEND_URL}/favoritos/agregar`
      );
      url.searchParams.append("usuario_id", favorito.usuario_id);
      url.searchParams.append("producto_id", favorito.producto_id);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      };
      axios
        .post(url.toString(), favorito, requestOptions)
        .then((response) => {
          if (response.status === 200) {
            //console.log('Favorito agregado');
            const updatedFavorites = [...state.favorites, favorito];
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            dispatch({ type: "SET_FAVORITES", payload: updatedFavorites });
            setIsProductFavorite(true);
          } else {
            console.log("ERROR");
          }
        })
        .catch((error) => {
          //console.error('Error:', error);
        });
    }
  };
  const handleRemoveFavorite = () => {
    const productoId = product.id;
    const url = `${import.meta.env.VITE_BACKEND_URL
      }/favoritos/eliminar/${productoId}`;
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    axios
      .delete(url, requestOptions)
      .then((response) => {
        if (response.status === 200) {
          //console.log('Producto eliminado de favoritos');
          const updatedFavorites = state.favorites.filter(
            (favorito) => favorito.producto_id !== productoId
          );
          dispatch({ type: "SET_FAVORITES", payload: updatedFavorites });
          setIsProductFavorite(false);
        } else {
          console.log("ERROR");
        }
      })
      .catch((error) => {
        //console.error('Error:', error);
      });
  };
  const handleDateRangeChange = (startDate, endDate) => {
    setFechaDesde(startDate);
    setFechaHasta(endDate);
  };

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

  const rentarProducto = () => {
    const fechaDesdeDate = new Date(fechaDesde);
    const fechaHastaDate = new Date(fechaHasta);
    if (!isLogged) {
      swal({
        text: "Registrarse e iniciar sesión para reservar.",
        timer: 3000,
        buttons: false,
      });
      return;
    }
    // Check if fechaDesde or fechaHasta is null
    if (!fechaDesde || !fechaHasta) {
      swal({
        text: "Selecciona fechas de retiro y devolución en el calendario.",
        timer: 3000,
        buttons: false,
      });
      return;
    }
    if (fechaDesdeDate.getTime() === fechaHastaDate.getTime()) {
      swal({
        title: "Error",
        text: "La fecha de inicio no pude ser igual a la fecha de devolución",
        timer: 3000,
        buttons: false,
      });
      return;
    }
    // Setear los valores necesarios para renderizar en Reservas.jsx
    const producto = product;
    console.log(fechaDesdeDate);
    console.log(fechaHastaDate);
    // Redireccionar a la ruta /reservas
    navigate("/reservas", {
      state: {
        producto,
        fechaDesdeDate,
        fechaHastaDate,
      },
    });
    //setVerRentarProductoComponent(true);
  };

  // ===========Mapa======================
  const handleClickMapa = () => {
    setMostrarMapa(!mostrarMapa);

    if (colorIcono === "#c7c7c7") {
      setColorIcono("#16213E");
    } else {
      setColorIcono("#c7c7c7");
    }
  };

  // ============compartir Producto===========
  const appUrl = `http://buckets3-harmonyrentals-front.s3-website.us-east-2.amazonaws.com/producto/${product.id}`;
  const compartirProducto = (Url) => {
    window.open(Url, "_blank");
    handleClose();
  };
  //================puntuarProducto=================/
  const sendRating = (puntuacion) => {
    if (puntuacion !== 0) {
      // Create an object with the rating value
      const requestData = {
        puntaje: puntuacion,
        producto_id: product.id,
        usuario_id: state.auth.id,
      };

      // Make a POST request to your backend endpoint using Axios
      axios
        .post(
          `${import.meta.env.VITE_BACKEND_URL}/puntuacion/agregar`,
          requestData
        )
        .then((response) => {
          // Handle the response from the backend if needed
          setTimeout(() => {
            location.reload();
          }, 3500);
          swal({
            title: "Gracias!",
            text: "Tu puntuación nos ayuda a mejorar",
            icon: "success",
          });
        })
        .catch((error) => {
          // Handle any errors that occur during the request
          console.error("Error:", error);
        });
    } else {
      // Handle the case when puntuacion is 0
      console.log("Please select a rating value.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className="contex-detalle">
        <Paper className="paper" sx={{ boxShadow: "0 0 2px 2px #8f8f8f88" }}>
          <Box sx={{ width: "87%" }}>
            <Box
              className="icons2"
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                background: "white",
                mr: 15,
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              {/* =============== icon ================= */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              >
                <Link onClick={handleClickMapa}>
                  <PlaceIcon
                    className="icon-ubicacion"
                    sx={{ color: colorIcono, mt: 0.4, mr: 0.5 }}
                  />
                </Link>
                <Box>
                  <ShareIcon
                    fontSize="small"
                    onClick={handleClick}
                    sx={{ mt: 0.6 }}
                  />
                </Box>
              </Box>

              {isLogged ? (
                <Checkbox
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                  }}
                  name="favoriteCheck"
                  //{...label}
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  checked={isProductFavorite}
                  onClick={
                    isProductFavorite
                      ? handleRemoveFavorite
                      : handleToggleFavorite
                  }
                  color="secondary"
                />
              ) : (
                ""
              )}

              <Popover
                sx={{ mt: 1.5, ml: 0.5 }}
                id={id2}
                open={open2}
                anchorEl={anchorEl}
                onClose={handleClose2}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: 10, horizontal: "right" }}
              >
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row-reverse",
                      justifyContent: "space-between",
                      alignItems: "center",
                      backgroundColor: "#e6e6e6",
                    }}
                  >
                    {/* <CloseIcon onClick={handleClose2} style={{ cursor: 'pointer' }}  /> */}
                    {/* <Typography variant='h9' sx={{ color: '#16213E', textAlign: 'center', padding: '5px', height:'25px'}}>Compartir Producto </Typography> */}
                  </Box>
                  <List
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      height: "35px",
                    }}
                  >
                    <ListItem
                      sx={{ "&:hover": { backgroundColor: "transparent" } }}
                      button
                      onClick={() =>
                        compartirProducto(
                          `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
                            appUrl
                          )}`
                        )
                      }
                    >
                      <LinkedInIcon sx={{ color: "#16213e" }} />
                    </ListItem>
                    <ListItem
                      sx={{ "&:hover": { backgroundColor: "transparent" } }}
                      button
                      onClick={() =>
                        compartirProducto(
                          `https://api.whatsapp.com/send?text=${encodeURIComponent(
                            appUrl
                          )}`
                        )
                      }
                    >
                      <WhatsAppIcon sx={{ color: "#16213e" }} />
                    </ListItem>
                    <ListItem
                      sx={{ "&:hover": { backgroundColor: "transparent" } }}
                      button
                      onClick={() =>
                        compartirProducto(
                          `https://twitter.com/share?url=${encodeURIComponent(
                            appUrl
                          )}`
                        )
                      }
                    >
                      <TwitterIcon sx={{ color: "#16213e" }} />
                    </ListItem>
                    <ListItem
                      sx={{ "&:hover": { backgroundColor: "transparent" } }}
                      button
                      onClick={() =>
                        compartirProducto(
                          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                            appUrl
                          )}`
                        )
                      }
                    >
                      <FacebookIcon sx={{ color: "#16213e" }} />
                    </ListItem>
                    <ListItem
                      sx={{ "&:hover": { backgroundColor: "transparent" } }}
                      button
                      onClick={handleShareEmail}
                    >
                      <LocalPostOfficeIcon sx={{ color: "#16213e" }} />
                    </ListItem>
                  </List>
                </Box>
              </Popover>
            </Box>
          </Box>
          {/* ======== Mapa ============*/}
          <Box id="mapContainer" sx={{}}>
            <Box id="mapBox" sx={{ mb: "2vh" }}>
              {mostrarMapa && <TraceMapa />}
            </Box>
          </Box>
          <Grid container spacing={2} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            {/* Contenedor de Imagenes */}
            <Box className="box-contenedor-1" >

              <Grid item xs={12} sm={6}
                sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}
              >
                <CardMedia
                  component="img"
                  className="product-img"
                  image={product.imagenes[0]}
                  onClick={() => handleImageClick(0)}
                  sx={{ display: "flex", objectFit: "contain" }}
                />
                <ImageList
                  className="img-list"
                  sx={{ display: "flex", overflow: "hidden" }}
                >
                  {product.imagenes.slice(1, 5).map((item, index) => (
                    <ImageListItem key={index}>
                      <img
                        style={{
                          border: "1px solid #8f8f8f88",
                          width: "100px",
                          height: "100px",
                          maxHeight: "100px",
                          objectFit: "contain",
                        }}
                        src={`${item}?w=164&h=164&fit=crop&auto=format`}
                        srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.nombre}
                        loading="lazy"
                        onClick={() => handleImageClick(index)}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
                <Dialog open={open} onClose={handleClose}>
                  <Carousel
                    showArrows={true}
                    showThumbs={false}
                    className="custom-carousel"
                    selectedItem={selectedImageIndex}
                  >
                    {product.imagenes.map((item, index) => (
                      <div key={index}>
                        <img
                          src={item}
                          style={{
                            width: "100%",
                            height: "600px",
                            objectFit: "contain",
                          }}
                        />
                      </div>
                    ))}
                  </Carousel>
                </Dialog>
              </Grid>
              {/* Contenedor de Datos */}
              <Grid item xs={12} sm={5}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  width: "50vh",
                  textAlign: "center",
                }}
              >
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
                >
                  <Typography
                    className="nombre-detalle"
                    variant="h4"
                    sx={{ color: "#16213e" }}
                  >
                    {product.nombre}
                  </Typography>
                  <Typography
                    variant="body1"
                    className="description"
                    align="justify"
                    sx={{ mt: "1vh", width: "100%", color: "#737270" }}
                  >
                    {product.descripcion}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignitems: "center",
                      gap: 0.5,
                    }}
                  >
                    <Typography variant="h6" sx={{ color: "#737270" }}>
                      Valor diario:
                    </Typography>
                    <Typography variant="h6" color={"#16213e"}>
                      {" "}
                      ${product.precio_x_dia}{" "}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",

                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "19",
                      gap: 0.5,
                    }}
                  >
                  {!isLogged &&(<Typography variant="h6" sx={{ color: "#737270" }}>Puntaje</Typography>)}
                  <Typography sx={{ color: "#16213e", fontSize:45 }}>{puntaje}</Typography>
                  
                  <Box>
                    {isLogged && (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          flexDirection: "column",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          {puntuacionPrevia === null ? (
                            // Render loading indicator or skeleton component here
                            <Skeleton
                              variant="rectangular"
                              width={170}
                              height={20}
                            />
                          ) : (
                            <div>
                              {puntuacionPrevia === 0 ? (
                                <Box sx={{ lineHeight: "1px" }}>
                                  <Rating
                                    value={puntuacion}
                                    onChange={(event, newValue) => {
                                      setPuntuacion(newValue);
                                      sendRating(newValue);
                                    }}
                                  />
                                  <Typography
                                    variant="subtitle2"
                                    sx={{
                                      fontSize: 14,
                                      textAlign: "center",
                                      color: "#737270",
                                    }}
                                  >
                                    Puntuar producto
                                  </Typography>
                                </Box>
                              ) : (
                                <div>
                                  <Rating value={puntuacionPrevia} readOnly />
                                  <Typography
                                    variant="subtitle2"
                                    sx={{
                                      fontSize: 14,
                                      textAlign: "center",
                                      color: "#737270",
                                      lineHeight:"5px",
                                      mb:1
                                    }}
                                  >
                                    Tu puntuación: {puntuacionPrevia}
                                  </Typography>
                                </div>
                              )}
                            </div>
                          )}
                        </Box>
                      </Box>
                    )}
                  </Box>
                </Box>
                </Box>
              </Grid>

            </Box>
          </Grid>
          {/* Contenedor de políticas y Fechas */}
          <Box
            sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
            ref={mapRef}
          >
            <Box className="poli-fecha" sx={{ display: "flex", gap: 5 }}>
              <Box className="policies">
                <PoliciesList />
              </Box>
              <Box>
                <Box className="text-fecha">
                  <Typography
                    variant="h6"
                    id="disponible"
                    sx={{ letterSpacing: "3px", lineHeight: "1.5" }}
                  >
                    Fechas Disponibles
                  </Typography>
                </Box>
                <Calendar
                  fixed={true}
                  reservedDates={reserved}
                  onDateRangeChange={handleDateRangeChange}
                />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Button
              variant="contained"
              className="btn-add"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "150px",
                textTransform: "none",
              }}
              onClick={rentarProducto}
            >
              Reservar
            </Button>
          </Box>
          {/*)}*/}

          <Box
            className="class-detalle"
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
              mb: 2,
              mr: 2,
            }}
          >
            <Button className="boton-detalle">
              <Link
                to="/"
                style={{
                  fontSize: "large",
                  fontWeight: "bold",
                  borderRadius: "3px",
                  color: "#16213e",
                  height: "2em",
                  width: "5em",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <KeyboardReturnIcon />
              </Link>
            </Button>
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default ProductoDetalle;
