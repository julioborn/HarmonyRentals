import React, { useState, useEffect } from "react";
import { Box, Typography, Tabs, Tab } from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import AgregarUsuarioForm from "./AgregarUsuarioForm";
import ListadoUsuariosAdmin from "./ListadoUsuariosAdmin";

const theme = createTheme({
  palette: {
    primary: {
      main: "#16213E", // Personalizar el color primary
    },
    secondary: {
      main: "#00ff00", // Personalizar el color secondary
    },
  },
});

const PanelCategorias = () => {
  const [activeTab, setActiveTab] = useState(0); // Active tab index

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography sx={{ textAlign: "center", fontSize: "30px", pt: "5vh" }}>
          Usuarios
        </Typography>

        {/* Tabs Component */}
        <Tabs
          value={activeTab}
          onChange={(event, newValue) => setActiveTab(newValue)}
          centered
        >
          <Tab label="Listado" />
          <Tab label="Agregar" />
        </Tabs>

        {/* Content for the selected tab */}
        {activeTab === 0 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ListadoUsuariosAdmin />
          </Box>
        )}

        {activeTab === 1 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AgregarUsuarioForm />
          </Box>
        )}
      
      </Box>
    </>
  );
};

export default PanelCategorias;
