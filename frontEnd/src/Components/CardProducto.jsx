import React, { useContext, useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Box, ThemeProvider, createTheme, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../Context/GlobalContext';
import { useLocation } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import "../Style/CardProducto.css"
import axios from 'axios';
import { CheckBox } from '@mui/icons-material';

const theme = createTheme({
    palette: {
        primary: {
            main: "#16213E",
        },
        secondary: {
            main: "#e94560",
        }
    }
});

export const CardProducto = ({ producto, isLoggedIn, showDeleteButton, handleDeleteProduct }) => {
    const navigate = useNavigate();
    const showDetails = () => {
        navigate(`/producto/${producto.id}`);
    };
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const { state, dispatch } = useContext(GlobalContext);
    const [isProductFavorite, setIsProductFavorite] = useState(false);
    const location = useLocation();
    const isFavoritesRoute = location.pathname === "/favoritos";

    useEffect(() => {
        const checkFavoriteStatus = async () => {
            try {
                if (state.auth.isLogged) {
                    const usuarioId = state.auth.id;
                    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/favoritos/${usuarioId}/producto/${producto.id}`);
                    if (response.status === 200) {
                        const favorito = response.data;
                        setIsProductFavorite(!!favorito);
                    } else {
                        setIsProductFavorite(false);
                    }
                } else {
                    setIsProductFavorite(false);
                }
            } catch (error) {
                setIsProductFavorite(false);
            }
        };
        checkFavoriteStatus();
    }, [state.auth.id, producto.id]);

    const handleToggleFavorite = () => {
        if (state.auth.isLogged) {
            const usuarioId = state.auth.id;
            const productoId = producto.id;
            const favoritoExistente = state.favorites.find(
                (favorito) => favorito.producto_id === productoId
            );
            if (favoritoExistente) {
                return;
            }
            const favorito = {
                usuario_id: usuarioId,
                producto_id: productoId,
            };
            const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/favoritos/agregar`);
            url.searchParams.append('usuario_id', favorito.usuario_id);
            url.searchParams.append('producto_id', favorito.producto_id);
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            };
            axios.post(url.toString(), favorito, requestOptions)
                .then((response) => {
                    if (response.status === 200) {
                        const updatedFavorites = [...state.favorites, favorito];
                        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
                        dispatch({ type: 'SET_FAVORITES', payload: updatedFavorites });
                        setIsProductFavorite(true)
                    } else {
                        console.log('ERROR');
                    }
                })
                .catch((error) => {
                    // console.error('Error:', error);
                });
        }
    };

    const handleRemoveFavorite = () => {
        const productoId = producto.id;
        const url = `${import.meta.env.VITE_BACKEND_URL}/favoritos/eliminar/${productoId}`;
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };
        axios.delete(url, requestOptions)
            .then((response) => {
                if (response.status === 200) {
                    if (window.location.pathname === "/favoritos") {
                        window.location.reload();
                    }
                    const updatedFavorites = state.favorites.filter(
                        (favorito) => favorito.producto_id !== productoId
                    );
                    dispatch({ type: 'SET_FAVORITES', payload: updatedFavorites });
                    setIsProductFavorite(false);
                } else {
                    console.log('ERROR');
                }
            })
            .catch((error) => {
                // console.error('Error:', error);
            });
    };

    return (
        <ThemeProvider theme={theme}>
            <Card className="tarjeta" sx={{ borderRadius: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: "column" }}>
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        {showDeleteButton && (
                            <Checkbox
                                color="secondary"
                                onClick={() => handleDeleteProduct(producto.id)}
                                sx={{
                                    textTransform: "none", display: "flex", justifyContent: "flex-end",
                                    "&:hover": {
                                        backgroundColor: "transparent"
                                    }
                                }}
                                icon={<FavoriteBorder />}
                                checkedIcon={<Favorite />}
                                checked={isProductFavorite}
                            >
                                Eliminar
                            </Checkbox>
                        )}
                        {state.auth.isLogged && !isFavoritesRoute && (
                            <Checkbox
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    '&:hover': {
                                        backgroundColor: 'transparent',
                                    },
                                }}
                                {...label}
                                name="favoriteIcon"
                                icon={<FavoriteBorder />}
                                checkedIcon={<Favorite />}
                                checked={isProductFavorite}
                                onClick={isProductFavorite ? handleRemoveFavorite : handleToggleFavorite}
                                color="secondary"
                            />
                        )}
                    </Box>
                    <CardMedia
                        onClick={showDetails}
                        component="img"
                        className="media"
                        sx={{ objectFit: 'contain' }}
                        image={producto.imagenes && producto.imagenes.length > 0 ? producto.imagenes[0] : ''}
                        alt={producto.nombre}
                    />
                </Box>
                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: "column", borderTop: '1px solid gray' }}>
                    <Typography className="typo" onClick={showDetails}>
                        {producto.nombre}
                    </Typography>
                </CardContent>
            </Card>
        </ThemeProvider>
    );
};
