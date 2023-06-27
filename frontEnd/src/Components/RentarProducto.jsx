import React, { useContext, useState } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { Button, Typography, Grid, Box, createTheme, ThemeProvider } from "@mui/material";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import swal from "sweetalert";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RentarProducto = ({ producto, fechaDesdeDate, fechaHastaDate }) => {
  const { state, dispatch } = useContext(GlobalContext);
  const nombreUsuario = state.auth.nombre;
  const apellidoUsuario = state.auth.apellido;
  const emailUsuario = state.auth.usuario;
  const navigate = useNavigate();
  const [reservaExitosa, setReservaExitosa] = useState(false);


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

  const formatDate = (date) => {
    if (!date) {
      return "";
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };
  const fecha_desde = formatDate(fechaDesdeDate);
  const fecha_hasta = formatDate(fechaHastaDate);
  const calculateNumberOfDays = () => {
    if (fechaDesdeDate && fechaHastaDate) {
      const startTime = fechaDesdeDate.getTime();
      const endTime = fechaHastaDate.getTime();
      const timeDiff = endTime - startTime;
      const numberOfDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return numberOfDays;
    }
    return 0;
  };
  const numeroDias = calculateNumberOfDays();
  const valorTotal = producto.precio_x_dia * numeroDias;
  const handleReservarProducto = (e) => {
    e.preventDefault();
    const alquilerDTO = {
      usuario_id: state.auth.id,
      producto_id: producto.id,
      fecha_desde: fechaDesdeDate,
      fecha_hasta: fechaHastaDate,
      valor: producto.precio_x_dia * numeroDias,
    };
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/alquiler/agregar`, alquilerDTO, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response)
        if (response.status === 201) {
          // Alquiler registrado
          swal({
            title: "¡Reserva exitosa!",
            text: "El alquiler ha sido creado satisfactoriamente.",
            icon: "success",
            timer: 3000,
            buttons: false,
          });
          setReservaExitosa(true);
        } else {
          // La reserva no se ha realizado
          swal({
            title: "Error en la reserva",
            text: "Hubo un error al crear el alquiler. Por favor, inténtalo nuevamente.",
            icon: "error",
            timer: 3000,
            buttons: false,
          });
        }
      })
      .catch((error) => {
        // Error
        swal({
          title: "Error en la reserva",
          text: "Hubo un error al procesar la solicitud. Por favor, inténtalo nuevamente.",
          icon: "error",
          timer: 3000,
          buttons: false,
        });
        console.error(error);
      });
  };
  const descripcionPreview = producto.descripcion.slice(0, 50);

  return (
    <ThemeProvider theme={theme}>
      <form onSubmit={handleReservarProducto}>
        <Box>
          <Typography
            variant="h6"
            sx={{ mt: "2vh", mb: "3vh", color: "#16213E", textAlign: "center" }}
          >
            Confirma tu reserva {nombreUsuario}:
          </Typography>
          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "groove 1px #c2c2c2",
              borderBottom: 0,
              borderLeft: 0,
              borderRight: 0,
              color: "#16213E",
            }}
          >
            <Grid item xs={12} sm={6} md={2}
              sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <img
                src={producto.imagen}
                alt={producto.nombre}
                style={{ maxHeight: "120px", maxWidth: "120px", width: "auto" }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
              }}
            >
              <Typography variant="body1" sx={{ lineHeight: "2rem" }}>
                Instrumento:
              </Typography>
              <Box sx={{
                border: "groove 1px #c2c2c2", pl: "5px", lineHeight: "1.75rem", marginBottom: "10px", borderRadius: "3px"
              }}>
                <Typography variant="subtitle2" component="span"
                  sx={{ color: "#8d8e8f" }}            >
                  Nombre: {" "}
                </Typography>
                <Typography variant="body2" component="span">
                  {producto.nombre}
                </Typography>
              </Box>
              <Box sx={{
                border: "groove 1px #c2c2c2", pl: "5px", lineHeight: "1.75rem", marginBottom: "10px", borderRadius: "3px"
              }}>
                <Typography variant="subtitle2" component="span"
                  sx={{ color: "#8d8e8f" }}            >
                  Detalle: {" "}
                </Typography>
                <Typography variant="body2" component="span">
                  {descripcionPreview}...
                </Typography>
              </Box>
              <Box sx={{
                border: "groove 1px #c2c2c2", pl: "5px", lineHeight: "1.75rem", borderRadius: "3px"
              }}>
                <Typography variant="subtitle2" component="span"
                  sx={{ color: "#8d8e8f" }}            >
                  Valor por día:{" "}
                </Typography>
                <Typography variant="body2" component="span">
                  {producto.precio_x_dia}
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={8}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
              }}
            >
              <Typography variant="body1" sx={{ lineHeight: "2rem" }}>
                Datos del usuario:
              </Typography>
              <Box sx={{
                border: "groove 1px #c2c2c2", pl: "5px", lineHeight: "1.75rem", marginBottom: "10px", borderRadius: "3px"
              }}>
                <Typography variant="subtitle2" component="span"
                  sx={{ color: "#8d8e8f" }}            >
                  Nombre y apellido:{" "}
                </Typography>
                <Typography variant="body2" component="span">
                  {nombreUsuario} {apellidoUsuario}{" "}
                </Typography>
              </Box>
              <Box sx={{
                border: "groove 1px #c2c2c2", pl: "5px", lineHeight: "1.75rem", marginBottom: "10px", borderRadius: "3px"
              }}>
                <Typography variant="subtitle2" component="span"
                  sx={{ color: "#8d8e8f" }}            >
                  Email:{" "}
                </Typography>
                <Typography variant="body2" component="span">
                  {emailUsuario}
                </Typography>
              </Box>
              <Box sx={{
                border: "groove 1px #c2c2c2", pl: "5px", lineHeight: "1.75rem", borderRadius: "3px"
              }}>
                <Typography variant="subtitle2" component="span"
                  sx={{ color: "#8d8e8f" }}>
                  DNI:{" "}
                </Typography>
                <Typography variant="body2" component="span">
                  { }
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={8}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
              }}
            >
              <Typography variant="body1" sx={{ lineHeight: "2rem", }}>
                Detalle del alquiler:
              </Typography>
              <Box sx={{
                border: "groove 1px #c2c2c2", pl: "5px", lineHeight: "1.75rem", marginBottom: "10px", borderRadius: "3px"
              }}>
                <Typography variant="subtitle2" component="span"
                  sx={{ color: "#8d8e8f" }}            >
                  Fechas:{" "}
                </Typography>
                <Typography variant="body2" component="span">
                  {fecha_desde} / {fecha_hasta}
                </Typography>
              </Box>
              <Box sx={{
                border: "groove 1px #c2c2c2", pl: "5px", lineHeight: "1.75rem", marginBottom: "10px", borderRadius: "3px"
              }}>
                <Typography variant="subtitle2" component="span"
                  sx={{ color: "#8d8e8f" }}            >
                  Días de alquiler:{" "}
                </Typography>
                <Typography variant="body2" component="span">
                  {numeroDias}
                </Typography>
              </Box>
              <Box sx={{
                border: "groove 1px #c2c2c2", pl: "5px", lineHeight: "1.75rem", marginBottom: "10px", borderRadius: "3px"
              }}>
                <Typography variant="subtitle2" component="span"
                  sx={{ color: "#8d8e8f" }}            >
                  Valor Total:{" "}
                </Typography>
                <Typography variant="body2" component="span">
                  {valorTotal}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {reservaExitosa ? (
            <Button
              variant="contained"
              className="btn-add"
              onClick={() => navigate(-1)}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                width: "130px",
                textTransform: "none",
                gap: 1.4,
                mt: "2vh",
                mb: "2vh",
              }}
            >
              <KeyboardBackspaceIcon sx={{width:20, height:20}}/>
              Volver
            </Button>
          ) : (
            <Button
              type="submit"
              variant="contained"
              className="btn-add"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "150px",
                textTransform: "none",
                mt: "2vh",
                mb: "2vh",
              }}
            >
              Confirmar
            </Button>
          )}
        </Box>

      </form>
    </ThemeProvider>
  );
};

export default RentarProducto;
