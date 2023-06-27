import { useState, useEffect, useRef } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CardProducto } from "./CardProducto";
import Loading from "./Loading";
import "../Style/Random10.css"
import axios from "axios";

const theme = createTheme({
  palette: {
    primary: {
      main: "#16213E",
    }
  },
});

const endpoint = `${import.meta.env.VITE_BACKEND_URL}/producto/random`;
const Random10 = () => {
  const [productos, setProductos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const initialRender = useRef(true);

  const fetchRandomProducts = async () => {
  try {
    setIsLoading(true);
    const response = await axios.get(endpoint);
    if (response.status === 200) {
      setProductos(response.data);
    } else {
      setError(`Error: ${response.status}`);
    }
  } catch (error) {
    setError(error.message);
  } finally {
    setIsLoading(false);
  }
};

useEffect(() => {
  if (initialRender.current) {
    initialRender.current = false;
  } else {
    fetchRandomProducts();
  }
}, []);

  return (
    <ThemeProvider theme={theme}>
      <Box
        id="random10-container"
        sx={{
          height: 'auto',
          marginBottom: "7vh",
          backgroundColor: "#F0F0F0"
        }}
      >
        {isLoading ? (
          <Loading containerHeight={"40vh"} />
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  width: '100vw',
                  color: "#16213E",
                  textAlign: "center",
                  fontSize: 23,
                  fontWeight: "bolder",
                  height: 'auto',
                  marginTop: 2,
                  marginBottom: 3,
                }}
                id="recomendados"
              >
                Instrumentos Recomendados
              </Typography>
            </Box>
            <Box >
              <Grid container spacing={2} >
                {productos.map((producto, index) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={2.4}
                    key={producto.id}
                    id="random"
                  >
                    <CardProducto producto={producto} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default Random10;
