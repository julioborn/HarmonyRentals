import React, { useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ListadoProductosAdmin from "./ListadoProductosAdmin";
import AgregarProductoForm from "./AgregarProductoForm";


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

const PanelProductos = () => {
  const [activeTab, setActiveTab] = useState(0); // Active tab index

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Typography
          sx={{ textAlign: "center", fontSize: "30px", pt: "5vh" }}
        >
          Productos
        </Typography>
        
        {/* Tabs Component */}
        <Tabs
          value={activeTab}
          onChange={(event, newValue) => setActiveTab(newValue)}
          centered
          sx={{
            width: "100%",
            maxWidth: "500px",
            marginBottom: "20px",
          }}
        >
          <Tab
            label="Listado"
            sx={{ textTransform: "none", fontSize: "15px" }}
          />
          <Tab
            label="Agregar"
            sx={{ textTransform: "none", fontSize: "15px" }}
          />
        </Tabs>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* Content for the selected tab */}
          {activeTab === 0 && <ListadoProductosAdmin />}
          {activeTab === 1 && <AgregarProductoForm />}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default PanelProductos;
