import React, { useContext } from "react";
import { GlobalContext } from "../../Context/GlobalContext";
import { Button, Typography, Grid, Box, Paper } from "@mui/material";
import swal from "sweetalert";

import {  useNavigate } from "react-router-dom";

const PreviewRentar = ({ producto, fechaDesde, fechaHasta }) => {
  const { state, dispatch } = useContext(GlobalContext);
  const nombreUsuario = state.auth.nombre;
  const navigate = useNavigate();
  const formatDate = (date) => {
    if (!date) {
      return "";
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };

  const fecha_desde = formatDate(fechaDesde);
  const fecha_hasta = formatDate(fechaHasta);

  const calculateNumberOfDays = () => {
    if (fechaDesde && fechaHasta) {
      const startTime = fechaDesde.getTime();
      const endTime = fechaHasta.getTime();
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
    dispatch({
      type: 'UPDATE_DATES',
      payload: {
        startDate,
        endDate,
      },
    });
    navigate(`/reservar/${producto.id}`)
  

  };
  const descripcionPreview = producto.descripcion.slice(0, 50);
  return (
    <form onSubmit={handleReservarProducto}>
      <Box>
        <Typography
          variant="h5"
          sx={{ mt:0.8,pb:"5px", mb: "1vh", color: "#16213E", textAlign: "center", borderBottom:"groove 1px #c7c7c7" }}
        >
          Confirma tu reserva {nombreUsuario}
        </Typography>
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#16213E",
          }}
        >
          
          <Grid
            item
            xs={12}
            sm={6}
            md={10}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
            }}
          >
            <Typography variant="body1" sx={{ lineHeight: "2rem" }}>
              Instrumento:
            </Typography>
            <Box
              sx={{
                border: "groove 1px #c2c2c2",
                pl: "5px",
                lineHeight: "1.75rem",
                marginBottom: "10px",
                borderRadius: "3px",
              }}
            >
              <Typography
                variant="subtitle2"
                component="span"
                sx={{ color: "#8d8e8f" }}
              >
                Nombre:{" "}
              </Typography>
              <Typography variant="body2" component="span">
                {producto.nombre}
              </Typography>
            </Box>
            <Box
              sx={{
                border: "groove 1px #c2c2c2",
                pl: "5px",
                lineHeight: "1.75rem",
                marginBottom: "10px",
                borderRadius: "3px",
              }}
            >
              <Typography
                variant="subtitle2"
                component="span"
                sx={{ color: "#8d8e8f" }}
              >
                Detalle:{" "}
              </Typography>
              <Typography variant="body2" component="span">
                {descripcionPreview}...
              </Typography>
            </Box>

            <Box
              sx={{
                border: "groove 1px #c2c2c2",
                pl: "5px",
                lineHeight: "1.75rem",
                borderRadius: "3px",
              }}
            >
              <Typography
                variant="subtitle2"
                component="span"
                sx={{ color: "#8d8e8f" }}
              >
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
            md={10}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
            }}
          >
            <Typography variant="body1" sx={{ lineHeight: "2rem" }}>
              Detalle del alquiler:
            </Typography>
            <Box
              sx={{
                border: "groove 1px #c2c2c2",
                pl: "5px",
                lineHeight: "1.75rem",
                marginBottom: "10px",
                borderRadius: "3px",
              }}
            >
              <Typography
                variant="subtitle2"
                component="span"
                sx={{ color: "#8d8e8f" }}
              >
                Fechas:{" "}
              </Typography>
              <Typography variant="body2" component="span">
                {fecha_desde} / {fecha_hasta}
              </Typography>
            </Box>
            <Box
              sx={{
                border: "groove 1px #c2c2c2",
                pl: "5px",
                lineHeight: "1.75rem",
                marginBottom: "10px",
                borderRadius: "3px",
              }}
            >
              <Typography
                variant="subtitle2"
                component="span"
                sx={{ color: "#8d8e8f" }}
              >
                Días de alquiler:{" "}
              </Typography>
              <Typography variant="body2" component="span">
                {numeroDias}
              </Typography>
            </Box>
            <Box
              sx={{
                border: "groove 1px #c2c2c2",
                pl: "5px",
                lineHeight: "1.75rem",
                marginBottom: "10px",
                borderRadius: "3px",
              }}
            >
              <Typography
                variant="subtitle2"
                component="span"
                sx={{ color: "#8d8e8f" }}
              >
                Valor Total:{" "}
              </Typography>
              <Typography variant="body2" component="span">
                {valorTotal}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      
    </form>
  );
};

export default PreviewRentar;
