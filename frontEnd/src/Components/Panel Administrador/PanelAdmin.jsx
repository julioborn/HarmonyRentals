import PanelProductos from "../Panel Administrador/AdminProducto/PanelProductos";
import PanelCategorias from "../Panel Administrador/AdminCategoria/PanelCategorias";
import PanelUsuarios from "../Panel Administrador/AdminUsuario/PanelUsuarios";
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
import "../../Style/PanelAdmin.css"
import CategoryIcon from '@mui/icons-material/Category';
import GroupIcon from '@mui/icons-material/Group';
import PianoIcon from '@mui/icons-material/Piano';

const PanelAdmin = ({ adminUser }) => {
  const [verComponente, setVerComponente] = useState("productos");

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
            backgroundColor: "#EBE8E8",
            position: "fixed",
            top: 0,
            left: 0,
            overflowY: "auto",
            zIndex: 2,
          }}
        >

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              width: "auto",
              height: "100vh",
              backgroundColor: "#16213e",
            }}
          >

            <Typography
              className="panel-title"
              variant="h5"
              sx={{ color: "#E0E0E0", width: "250px" }}
              mb={3}
            >
              Panel de Administración
            </Typography>

            <Link onClick={handleVerProductos} style={{ textDecoration: "none", marginBottom: "4vh" }}>
              <Typography
                id="typos"
                className={`panel-link ${verComponente === "productos" ? "selected" : ""}`}
                variant="button"
                sx={{
                  padding: 1,
                  textTransform: "none",
                  fontSize: "16px",
                  color: "#E0E0E0",
                  borderRadius: 1,
                }}
              >
                Productos
              </Typography>
              <PianoIcon className={`icons ${verComponente === "productos" ? "icons-selected" : ""}`} sx={{ color: "white" }} />
            </Link>

            <Link onClick={handleVerCategorias} style={{ textDecoration: "none", marginBottom: "4vh" }}>
              <Typography
                id="typos"
                className={`panel-link ${verComponente === "categorias" ? "selected" : ""}`}
                variant="button"
                sx={{
                  padding: 1,
                  textTransform: "none",
                  fontSize: "16px",
                  color: "#E0E0E0",
                  borderRadius: 1,
                }}
              >
                Categorías
              </Typography>
              <CategoryIcon className={`icons ${verComponente === "categorias" ? "icons-selected" : ""}`} sx={{ color: "white" }} />
            </Link>

            <Link onClick={handleVerUsuarios} style={{ textDecoration: "none", marginBottom: "4vh" }}>
              <Typography
                id="typos"
                className={`panel-link ${verComponente === "usuarios" ? "selected" : ""}`}
                variant="button"
                sx={{
                  padding: 1,
                  textTransform: "none",
                  fontSize: "16px",
                  color: "#E0E0E0",
                  borderRadius: 1,
                }}
              >
                Usuarios
              </Typography>
              <GroupIcon className={`icons ${verComponente === "usuarios" ? "icons-selected" : ""}`} sx={{ color: "white" }} />
            </Link>
          </Box>
        </Grid>
        <Grid
          className="productos-box"
          item
          xs
          sx={{
            marginLeft: "25vw",
            height: "100%",
            overflowY: "auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          {verComponente === "productos" && (
            <Box
              className="produ-box"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                justifyContent: "center",
                mt: "10vh",
                mb: "8vh"
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