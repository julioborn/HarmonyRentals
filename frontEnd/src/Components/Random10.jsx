import { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CardProducto } from "./CardProducto";
import Loading from "./Loading";
import "../Style/Random10.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#16213E",
    }
  },
});

const endpoint = "http://3.145.94.82:8080/producto/random";

const Random10 = () => {
  const [productos, setProductos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productos
    ? productos.slice(indexOfFirstProduct, indexOfLastProduct)
    : [];

  useEffect(() => {
    const fetchRandomProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(endpoint);
        if (response.ok) {
          const data = await response.json();
          setProductos(data);
        } else {
          setError(`Error: ${response.status}`);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch random products initially
    fetchRandomProducts();


  }, []);

  useEffect(() => {
    const container = document.getElementById("random10-container");
    if (container) {
      container.classList.add("fade");
    }
  }, [currentPage]);

  const handleChangePage = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        id="random10-container"
        sx={{
          height:'auto',
          marginBottom: "7vh",
          background: 'rgb(255,255,255)',
          background: 'linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(200,201,202,1) 79%, rgba(255,255,255,1) 100%)',
          padding: "0em 3em 2em 3em"
        }}
      >
        {isLoading ? (
          <Loading />
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
                  fontSize: 27,
                  fontWeight: "bolder",
                  height: '5vh',
                  marginTop: '13px',
                }}
                className="recomendados"
              >
                Instrumentos Recomendados
              </Typography>
            </Box>
            <Grid container spacing={2}>
              {currentProducts.map((producto, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={2.4}
                  key={producto.id}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                  }}
                 >
                  <CardProducto producto={producto} />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default Random10;
