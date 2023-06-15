import React, { useContext, useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Box, ThemeProvider, createTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../Context/GlobalContext';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

const theme = createTheme({
    palette: {
        primary: {
            main: "#16213E",
        },
        secondary: {
            main: "#e94560",
        }
    },
});

export const CardProducto = ({ producto, isLoggedIn }) => {
    const navigate = useNavigate();
    const showDetails = () => {
        navigate(`/producto/${producto.id}`);
    };
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const { state, dispatch } = useContext(GlobalContext);

    const [isProductFavorite, setIsProductFavorite] = useState(false);

    useEffect(() => {
        const checkFavoriteStatus = async () => {
            try {
                const usuarioId = state.auth.id;
                const response = await fetch(`http://3.145.94.82:8080/favoritos/${usuarioId}/producto/${producto.id}`);
                if (response.ok) {
                    const favorito = await response.json();
                    setIsProductFavorite(!!favorito);
                } else {
                    setIsProductFavorite(false);
                }
            } catch (error) {
                console.error('Error:', error);
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
            const url = new URL('http://3.145.94.82:8080/favoritos/agregar');
            url.searchParams.append('usuario_id', favorito.usuario_id);
            url.searchParams.append('producto_id', favorito.producto_id);
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            };
            fetch(url.toString(), requestOptions)
                .then((response) => {
                    if (response.ok) {
                        const updatedFavorites = [...state.favorites, favorito];
                        dispatch({ type: 'SET_FAVORITES', payload: updatedFavorites });
                        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
                        dispatch({ type: 'SET_FAVORITES', payload: updatedFavorites });
                        setIsProductFavorite(true)
                    } else {
                        console.log('ERROR');
                    }
                })
                .catch((error) => {});
        }
    };

    const handleRemoveFavorite = () => {
        const productoId = producto.id;
        const url = `http://3.145.94.82:8080/favoritos/eliminar/${productoId}`;
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(url, requestOptions)
            .then((response) => {
                if (response.ok) {
                    setIsProductFavorite(false)
                    if (window.location.pathname === "/favoritos") {
                        window.location.reload();
                    }
                } else {
                    console.log('ERROR');
                }
            })
            .catch((error) => {});
    };

    return (
        <ThemeProvider theme={theme}>
            <Card className="tarjeta" sx={{ borderRadius: 1, width:'100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: "column" }}>
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        {state.auth.isLogged && (
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
                        image={producto.imagen}
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
