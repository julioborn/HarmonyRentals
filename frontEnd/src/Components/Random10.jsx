import { useState, useEffect , useRef} from "react";
import { Box, Grid, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CardProducto } from "./CardProducto";
import Loading from "./Loading";
import "../Style/Random10.css"

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const initialRender = useRef(true);
  const fetchRandomProducts = async () => {
    try {
      //setIsLoading(true);
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
          height:'auto',
          marginBottom: "7vh",
          background: 'rgb(255,255,255)',
          background: 'linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(200,201,202,1) 79%, rgba(255,255,250,1) 100%)',
          padding: "0em 3em 2em 3em"
        }}
      >
        {isLoading ? (
          <Loading containerHeight={"40vh"}/>
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
                  marginTop: '13px',
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
