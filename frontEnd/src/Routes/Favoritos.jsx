import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from "../Context/GlobalContext";
import { CardProducto } from '../Components/CardProducto';
import { Box, Button, Typography } from '@mui/material';
import '../Style/Favoritos.css';

const Favoritos = () => {
    const [favoritos, setFavoritos] = useState([]);
    const { state, dispatch } = useContext(GlobalContext);

    useEffect(() => {
        const fetchFavoritos = async () => {
            try {
                const usuarioId = state.auth.id;
                const response = await fetch(`http://3.145.94.82:8080/favoritos/${usuarioId}`);
                if (response.ok) {
                    const favoritosData = await response.json();
                    setFavoritos(favoritosData);
                } else {}
            } catch (error) {}
        };
        fetchFavoritos();
    }, []);

    const handleRemoveAllFavorites = () => {
        const usuarioId = state.auth.id;
        fetch(`http://3.145.94.82:8080/favoritos/eliminar-favoritos/${usuarioId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    dispatch({ type: 'REMOVE_ALL_FAVORITES' });
                    setFavoritos([]);
                } else {}
            })
            .catch((error) => {});
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", paddingBottom: 10, paddingTop: 20 }}>
            {favoritos.length > 0 ? (
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", justifyContent: "center" }}>
                        {favoritos.map((favorito) => (
                            <CardProducto
                                key={favorito.id}
                                producto={{
                                    id: favorito.producto.id,
                                    nombre: favorito.producto.nombre,
                                    imagen: favorito.producto.imagen
                                }}
                                isLoggedIn={state.auth.isLogged}
                            />
                        ))}
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
                        <Button
                            variant="contained"
                            sx={{
                                fontSize:"15px",
                                textTransform: "none",
                                backgroundColor: "#16213e",
                                "&:hover": {
                                    backgroundColor: "#283047"
                                },
                                width: 280
                            }}
                            onClick={handleRemoveAllFavorites}
                        >
                            Eliminar todos
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
