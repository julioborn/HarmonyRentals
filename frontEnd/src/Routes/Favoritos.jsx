import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from "../Context/GlobalContext";
import { CardProducto } from '../Components/CardProducto';
import { Box, Button, Typography } from '@mui/material';
import '../Style/Favoritos.css';
import Loading from "../Components/Loading";
import axios from 'axios';

const Favoritos = () => {
    const [favoritos, setFavoritos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { state, dispatch } = useContext(GlobalContext);

    useEffect(() => {
        const fetchFavoritos = async () => {
            try {
                const usuarioId = state.auth.id;
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/favoritos/${usuarioId}`);
                if (response.status === 200) {
                    const favoritosData = response.data;
                    setFavoritos(favoritosData);
                    setIsLoading(false);
                } else {
                    //console.log('ERROR');
                }
            } catch (error) {
                //console.error('Error:', error);
            }
        };
        fetchFavoritos();
    }, []);

    const handleRemoveAllFavorites = () => {
        const usuarioId = state.auth.id;
        axios.delete(`${import.meta.env.VITE_BACKEND_URL}/favoritos/eliminar-favoritos/${usuarioId}`)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({ type: 'REMOVE_ALL_FAVORITES' });
                    setFavoritos([]);
                } else {
                    //console.log("Error al eliminar");
                }
            })
            .catch((error) => {
                //console.log("Error solicitud eliminar");
            });
    };

    const handleRemoveFavorite = (productoId) => {
        // Eliminar el producto de la base de datos
        const url = `${import.meta.env.VITE_BACKEND_URL}/favoritos/eliminar/${productoId}`;
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };
        axios.delete(url, requestOptions)
            .then((response) => {
                if (response.status === 200) {
                    // Eliminar el producto de la lista de favoritos local
                    const updatedFavorites = favoritos.filter(favorito => favorito.producto.id !== productoId);
                    setFavoritos(updatedFavorites);
                    dispatch({ type: 'SET_FAVORITES', payload: updatedFavorites });
                } else {
                    //console.log("Error al eliminar el producto");
                }
            })
            .catch((error) => {
                //console.log("Error solicitud eliminar");
            });
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", paddingBottom: 10, paddingTop: 15, backgroundColor: "#F0F0F0" }}>
            {isLoading ? (
                <Loading />
            ) : favoritos.length > 0 ? (
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", alignContent: "center" }}>
                    <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", justifyContent: "center" }}>
                        {favoritos.map((favorito) => (
                            <Box key={favorito.id}>
                                <CardProducto
                                    producto={{
                                        id: favorito.producto.id,
                                        nombre: favorito.producto.nombre,
                                        imagenes: favorito.producto.imagenes
                                    }}
                                    isLoggedIn={state.auth.isLogged}
                                    showDeleteButton={true}
                                    handleDeleteProduct={handleRemoveFavorite}
                                />
                            </Box>
                        ))}
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
                        <Button
                            variant="contained"
                            sx={{
                                fontSize: "15px",
                                textTransform: "none",
                                backgroundColor: "#16213e",
                                "&:hover": {
                                    backgroundColor: "#283047"
                                },
                                width: 280
                            }}
                            onClick={handleRemoveAllFavorites}
                        >
                            Eliminar Todos
                        </Button>
                    </Box>
                </Box>
            ) : (
                <Box>
                    <Typography variant="h5" sx={{ textAlign: "center", color: "#16213e82" }}>
                        No hay favoritos
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default Favoritos;