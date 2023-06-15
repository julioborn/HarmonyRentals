import React, { useEffect, useState } from 'react';
import { CardProducto } from './CardProducto';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Grid, Typography } from '@mui/material';
import '../Style/ProductoDetalle.css'
import Loading from "./Loading";
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

const ProductosXCategoria = ({ categoria_id, categoriaDetalle }) => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchProductsByCategory = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`http://3.145.94.82:8080/producto/byCategoria/${categoria_id}`);
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data);                   
                } else {
                    setError(`Error: ${response.status}`);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
                
              }
        };

        fetchProductsByCategory();
    }, [categoria_id]);

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    marginBottom: '8vh',
                    background: 'rgb(255,255,255)',
                    background: 'linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(200,201,202,1) 79%, rgba(255,255,255,1) 100%)',
                    padding: "0em 3em 2em 3em"
                }}
                id='random-detalle'
                >
                {!isLoading ? (
                    <>
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                            <Typography sx={{
                                width: '100vw',
                                height:'auto',
                                textAlign: "center",
                                color: "#16213E",
                                fontSize: 23,
                                fontWeight: "bolder"
                            }}>{categoriaDetalle}</Typography>
                        </Box>
                        <Grid container spacing={2}
                        
                        >
                            {products.map((producto) => (
                                <Grid item xs={12} sm={6} md={4} lg={2.4} key={producto.id}
                                sx={{ display:"flex", justifyContent:"center"}}>
                                    <CardProducto producto={producto} />
                                </Grid>
                            ))}
                        </Grid>
                    </>
                ) : (
                    <Loading containerHeight={"40vh"}/>
                )}
            </Box>
        </ThemeProvider>
    );
};

export default ProductosXCategoria;
