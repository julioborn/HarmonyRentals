import React, { useState } from "react";
import { Box, Typography, Tabs, Tab } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import AgregarCategoriaForm from "./AgregarCategoriaForm";
import ListadoCategoriasAdmin from "./ListadoCategoriasAdmin";

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
        className="produ-box"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "20px"
        }}
      >
        <Typography sx={{ textAlign: "center", fontSize: "30px", pt: "5vh" }}>
          Categorías
        </Typography>
        {/* Tabs Component */}
        <Tabs
          value={activeTab}
          onChange={(event, newValue) => setActiveTab(newValue)}
          centered
        >
          <Tab label="Listado" sx={{ textTransform: "none", fontSize: "15px" }} />
          <Tab label="Agregar" sx={{ textTransform: "none", fontSize: "15px" }} />
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
            <ListadoCategoriasAdmin />
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
            <AgregarCategoriaForm />
          </Box>
        )}
      </Box>
    </>
  );
};

export default PanelCategorias;
