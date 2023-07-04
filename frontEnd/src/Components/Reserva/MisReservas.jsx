import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { GlobalContext } from "../../Context/GlobalContext";
import {
  Box,
  IconButton,
  Typography,
  Paper,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import "../../Style/MisReservas.css"
import { useNavigate } from "react-router-dom";

const MisReservas = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [alquilerList, setAlquilerList] = useState([]);
  const [page, setPage] = useState(1);
  const [productsPerPage] = useState(20);
  let usuarioId = state.auth.id;
  const navigate = useNavigate();

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
    const fetchAlquilerForUser = async () => {
      try {
        console.log(state);
        console.log(usuarioId);
        if (usuarioId) {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/alquiler/usuario/${usuarioId}`
          );
          setAlquilerList(response.data);
          console.log(response.data);
          setTotalPages(response.data.length > productsPerPage ? Math.ceil(response.data.length / productsPerPage) : 0);
        } else {
          console.error("Usuario ID is undefined.");
        }
      } catch (error) {
        console.error("Error fetching alquiler:", error.message);
      }
    };

    fetchAlquilerForUser();
  }, [usuarioId, productsPerPage]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/alquiler/${id}`
      );
      setAlquilerList(alquilerList.filter((alquiler) => alquiler.id !== id));
    } catch (error) {
      console.error("Error deleting alquiler:", error.message);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const startIndex = (page - 1) * productsPerPage;
  const endIndex = page * productsPerPage;

  function truncateDescription(description, maxLength) {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "...";
    }
    return description;
  }

  return (
    <ThemeProvider theme={theme}>
        <Typography variant="h5" sx={{ textAlign: "center", fontWeight: "400", mt:15}}>
          Mis Reservas:
        </Typography>
        {alquilerList.slice(startIndex, endIndex).map((alquiler, index) => (
          <Paper className="paper-reservas" elevation={5} sx={{ margin: "auto", width: "800px", minHeight: "400px", mt: 2, mb: 5 }}>
            <React.Fragment key={alquiler.id}>
              <Box className="box-principal" sx={{ display: "flex", gap: 2, padding:5, height: "200px", alignContent: "center", alignItems: "center", flexDirection: "column" }}>
                <Box className="titulos-reservas" sx={{ display: "flex", gap: 5, justifyContent: "center", alignItems: "center" }}>
                  <Box>
                    <Typography variant="h7" color={"gray"} fontSize={18} sx={{display:"flex", justifyContent:"center"}} > Instrumento: </Typography>
                    <Typography color="primary" sx={{ display: "flex", textAlign: "center", fontSize: 18, fontWeight: "400", cursor:"pointer", "&:hover":{color:"#525252"} }} onClick={() => navigate(`/producto/${alquiler.producto.id}`)}> {alquiler.producto.nombre}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="h7" color={"gray"} fontSize={18} sx={{ display: "flex", gap: 0.5, justifyContent:"center" }} > Fechas de reserva <CalendarMonthIcon color="primary" sx={{ width: 20, height: 20 }} /> </Typography>
                    <Box className="desdehasta" sx={{ display: "flex", gap: 1, mt:0.3 }}>
                      <Typography variant="h7" color="gray" sx={{ fontSize:18, display:"flex", gap:0.5, fontWeight:"400", textAlign:"center", justifyContent:"center"}} > Desde: <Typography color="primary"> {alquiler.fecha_desde} </Typography></Typography>
                      <Typography variant="h7" color="gray" sx={{ fontSize:18, display:"flex", gap:0.5, fontWeight:"400", textAlign:"center", justifyContent:"center"}} > Hasta: <Typography color="primary"> {alquiler.fecha_hasta}</Typography></Typography>
                    </Box>
                  </Box>
                </Box>
                <Box className="foto-descripcion" sx={{ display: "flex", gap: 10, mt: 2, justifyContent:"center", alignContent:"center", alignItems:"center" }}>
                  <img
                    src={alquiler.producto.imagenes[0]}
                    alt={alquiler.producto.nombre}
                    style={{
                      maxHeight: "200px",
                      maxWidth: "250px",
                      height: "auto",
                      width: "auto",
                    }}
                  />
                  <Typography className="descripcion" sx={{ width: 290, fontWeight: "200", display: "flex", justifyContent: "center" }}> {truncateDescription(alquiler.producto.descripcion, 320)} </Typography>
                </Box>
                <Box className="papelera" sx={{ width: "90%", display: "flex", justifyContent: "flex-end" }}>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDelete(alquiler.id)}
                    sx={{
                      color: "#CC0000",
                      "&:hover": {
                        backgroundColor: "transparent"
                      }
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </React.Fragment>
          </Paper>
        ))}

      {/*totalPages > 1 && (
        <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChangePage}
            color="primary"
          />
        </Box>
      )*/}
    </ThemeProvider >
  );
};

export default MisReservas;
