import PanelProductos from "../Panel Administrador/AdminProducto/PanelProductos";
import PanelCategorias from "../Panel Administrador/AdminCategoria/PanelCategorias";
import PanelUsuarios from "../Panel Administrador/AdminUsuario/PanelUsuarios"
import { GlobalContext } from '../../Context/GlobalContext';
import React, { useState, useContext } from "react";
import {
  createTheme,
  ThemeProvider,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const PanelAdmin = ({ adminUser }) => {
  const [verComponente, setVerComponente] = useState(null);

  const { state, dispatch } = useContext(GlobalContext);
  const isAdmin = state.auth.isAdmin;

  const handleVerProductos = () => {
    if (verComponente !== "productos") {
      setVerComponente("productos");
    } else {
      setVerComponente(null);
    }
  };

  const handleVerCategorias = () => {
    if (verComponente !== "categorias") {
      setVerComponente("categorias");
    } else {
      setVerComponente(null);
    }
  };
  const handleVerUsuarios = () => {
    if (verComponente !== "usuarios") {
      setVerComponente("usuarios");
    } else {
      setVerComponente(null);
    }
  };
  const theme = createTheme({
    palette: {
      primary: {
        main: "#16213E",
      },
      secondary: {
        main: "#00ff00",
      },
    },
  });

  return isAdmin ? (
    <ThemeProvider theme={theme}>
      <Grid container sx={{ height: "100vh" }}>
        <Grid
          className="paneladmin"
          item
          sx={{
            width: "18vw",
            backgroundColor: "#EBE8E8",
            position: "fixed",
            top: 0,
            left: 0,
            bottom: 0,
            overflowY: "auto",
            zIndex: 2,
            transition: "width 0.3s", 
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "center",
              width: "auto",
              height: "100vh",
              backgroundColor: "#DCDCDC"
            }}
          >
            <Typography variant="h5" color="primary" mb={3}>
              Panel de Administración
            </Typography>
            <Link style={{ textDecoration: "none", marginBottom: "4vh" }}>
              <Typography
                variant="button"
                onClick={handleVerProductos}
                sx={{
                  padding: 1,
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                  textTransform: "none",
                  fontSize: "16px",
                  backgroundColor: "white",
                  color: "#16213E",
                  borderRadius: 1
                }}
              >
                Productos
              </Typography>
            </Link>
            <Link style={{ textDecoration: "none", marginBottom: "4vh" }}>
              <Typography
                variant="button"
                onClick={handleVerCategorias}
                sx={{
                  padding: 1,
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                  textTransform: "none",
                  fontSize: "16px",
                  backgroundColor: "white",
                  color: "#16213E",
                  borderRadius: 1
                }}
              >
                Categorías
              </Typography>
            </Link>
            <Link style={{ textDecoration: "none", marginBottom: "4vh" }}>
              <Typography
                variant="button"
                onClick={handleVerUsuarios}
                sx={{
                  padding: 1,
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                  textTransform: "none",
                  fontSize: "16px",
                  backgroundColor: "white",
                  color: "#16213E",
                  borderRadius: 1
                }}
              >
                Usuarios
              </Typography>
            </Link>
          </Box>
        </Grid>

        <Grid
          item
          xs
          sx={{
            marginLeft: "20vw",
            height: "100%",
            overflowY: "auto",
            position: "relative", 
            zIndex: 1, 
            transition: "margin-left 0.3s", 
          }}
        >
          {verComponente === null && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                justifyContent: "center",
                height: "100vh",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  textAlign: "center",
                  color: "#16213E",
                }}
              >
                Seleccione una Vista
              </Typography>
            </Box>
          )}
          {verComponente === "productos" && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                justifyContent: "center",
                mt: "10vh",
                mb: "8vh",
              }}
            >
              <PanelProductos />
            </Box>
          )}
          {verComponente === "categorias" && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                justifyContent: "center",
                mt: "10vh",
                mb: "8vh",
              }}
            >
              <PanelCategorias />
            </Box>
          )}
          {verComponente === "usuarios" && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                justifyContent: "center",
                mt: "10vh",
                mb: "8vh",
              }}
            >
              <PanelUsuarios />
            </Box>
          )}
        </Grid>
      </Grid>
    </ThemeProvider>
  ) : null;
};

export default PanelAdmin;
