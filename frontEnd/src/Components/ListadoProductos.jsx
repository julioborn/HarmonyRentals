import { Grid, Box, Pagination, ThemeProvider, createTheme } from "@mui/material";
import { CardProducto } from "./CardProducto";
import Loading from "./Loading";
import React, { useState, useEffect } from "react";

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
const ListadoProductos = () => {
    const [productos, setProductos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    useEffect(() => {
        obtenerProductos();
    }, [currentPage]);
    const obtenerProductos = async () => {
        try {
            const response = await fetch(`http://3.145.94.82:8080/producto/paginado?page=${currentPage}&size=10`);
            const data = await response.json();
            setProductos(data.content);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.log(error);
        }
    };
    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '20px',
                    marginTop: '20px',
                    paddingLeft: "10px",
                    backgroundColor: '#dddddd',
                    height: "900px",
                }}>
                    <Box>
                        {productos.length > 0 ? (
                            <Grid container spacing={2}>
                                {productos.map((producto) => (
                                    <Grid item xs={12} sm={6} md={2.4} key={producto.id}>
                                        <CardProducto producto={producto} />
                                    </Grid>
                                ))}
                            </Grid>
                        ) : (
                            <Loading />
                        )}
                    </Box>
                    {totalPages > 1 && (
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Pagination
                                count={totalPages}
                                page={currentPage}
                                onChange={handlePageChange}
                                className="pagination"
                                color="primary"
                            />
                        </Box>
                    )}
                </Box>
            </ThemeProvider>
        </>
    );
};

export default ListadoProductos;
