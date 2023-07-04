import React, { useContext } from "react";
import { GlobalContext } from "../../Context/GlobalContext";
import { Button, Typography, Grid, Box, Paper, TextField } from "@mui/material";
import swal from "sweetalert";

import { useNavigate } from "react-router-dom";

const CalculadorAlquiler = ({ producto, fechaDesde, fechaHasta }) => {
  const { state, dispatch } = useContext(GlobalContext);
  const nombreUsuario = state.auth.nombre;
  const apellidoUsuario = state.auth.apellido;
  const emailUsuario = state.auth.usuario;
  const navigate = useNavigate();
 
  const formatDate = (date) => {
    if (!date) {
      return "";
    }

    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear();
    const month = String(formattedDate.getMonth() + 1).padStart(2, "0");
    const day = String(formattedDate.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };



  const fecha_desde = formatDate(fechaDesde);
  const fecha_hasta = formatDate(fechaHasta);

  const calculateNumberOfDays = () => {
    if (fechaDesde && fechaHasta) {
      const startTime = new Date(fechaDesde).getTime();
      const endTime = new Date(fechaHasta).getTime();
      const timeDiff = endTime - startTime;
      const numberOfDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return numberOfDays;
    }
    return 0;
  };

  const numeroDias = calculateNumberOfDays();
  const valorTotal = producto?.precio_x_dia * numeroDias;

  const handleReservarProducto = (e) => {
    e.preventDefault();
      sessionStorage.removeItem("fechaDesde");
      sessionStorage.removeItem("fechaHasta");
    const alquilerDTO = {
      usuario_id: state.auth.id,
      producto_id: producto?.id,
      fecha_desde: fechaDesde,
      fecha_hasta: fechaHasta,
      valor: producto?.precio_x_dia * numeroDias,
    };

    fetch("http://localhost:8080/alquiler/agregar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(alquilerDTO),
    })
      .then((response) => {
        if (response.ok) {
          // Alquiler registrado
          swal({
            title: "¡Reserva exitosa!",
            text: "El alquiler ha sido creado satisfactoriamente.",
            icon: "success",
            timer: 3000,
            buttons: false,
          });
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

  return (
    <form onSubmit={handleReservarProducto}>
       
      <Box sx={{display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column"}}>
      <Typography
            variant="subtitle1"
            sx={{ color: "#737270", textAlign: "center" }}
          >
            Verifica o modifica las fechas de tu alquiler:
          </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              className="usuarioFormField"
              size="small"
              label="Fecha de alquiler"
              fullWidth
              sx={{ marginTop: "2vh" }}
              InputProps={{ readOnly: true }}
              value={fecha_desde}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              className="usuarioFormField"
              size="small"
              label="Fecha de devolucion"
              fullWidth
              sx={{ marginTop: "2vh" }}
              InputProps={{ readOnly: true }}
              value={fecha_hasta}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              className="usuarioFormField"
              size="small"
              label="Días de alquiler"
              fullWidth
              sx={{ marginTop: "2vh" }}
              InputProps={{ readOnly: true }}
              value={numeroDias}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              className="usuarioFormField"
              size="small"
              label="Valor total"
              fullWidth
              sx={{ marginTop: "2vh" }}
              InputProps={{ readOnly: true }}
              value={valorTotal}
            />
          </Grid>
        </Grid>
        
      </Box>
      <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
             marginTop:"5vh",
            width: "100%",
            
          }}
        >
          <Button
            type="submit"
            variant="contained"
            className="btn-add"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "150px",
              backgroundColor: "#16213E",
              textTransform: "none",
              padding:"14px",
              "&:hover": {
                backgroundColor: "#e94560",
              },
            }}
          >
            Reservar
          </Button>
        </Box>
    </form>
  )
};

export default CalculadorAlquiler;
