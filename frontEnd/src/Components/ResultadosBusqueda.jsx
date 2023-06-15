import React, { useEffect, useRef } from 'react';
import { CardProducto } from './CardProducto';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Grid, Typography } from '@mui/material';
import '../Style/ProductoDetalle.css';
import Loading from './Loading';
const theme = createTheme({
  palette: {
    primary: {
      main: '#16213E',
    },
    secondary: {
      main: '#00ff00',
    },
  },
});

const ResultadosBusqueda = ({ productos }) => {
  const resultadosRef = useRef(null);

  useEffect(() => {
    if (productos && productos.length > 0 && resultadosRef.current) {
      setTimeout(() => {
        resultadosRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 2000); // demorar el scroll
    }
  }, [productos]);

  const renderProductos = () => {
    if (productos.length === 1) {
      // renderizar una card central cuando hay un solo producto
      const producto = productos[0];
      return (
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <CardProducto producto={producto} />
          </Grid>
        </Grid>
      );
    } else {
      // Renderizar listado de productos buscados
      return (
        <Grid container spacing={2}>
          {productos.map((producto) => (
            <Grid item xs={12} sm={6} md={4} lg={2.4} key={producto.id}>
              <CardProducto producto={producto} />
            </Grid>
          ))}
        </Grid>
      );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          marginBottom: '8vh',
          background: 'rgb(255,255,255)',
          background: 'linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(200,201,202,1) 79%, rgba(255,255,255,1) 100%)',
          padding: '0em 3em 2em 3em',
        }}
        id='random-detalle'
      >
        {productos ? (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
              <Typography
                sx={{
                  width: '100vw',
                  height: 'auto',
                  textAlign: 'center',
                  color: '#16213E',
                  fontSize: 23,
                  fontWeight: 'bolder',
                }}
              >
                Resultados de búsqueda
              </Typography>
            </Box>
            <div ref={resultadosRef}>{renderProductos()}</div>
          </>
        ) : (
          <Loading />
        )}
      </Box>
    </ThemeProvider>
  );
};

export default ResultadosBusqueda;
