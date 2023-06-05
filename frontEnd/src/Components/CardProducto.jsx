import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { useNavigate } from "react-router-dom";
import '../Style/CardProducto.css'

export const CardProducto = ({ producto }) => {
    //navegar a vista de detalle
    const navigate = useNavigate();
    const showDetails = () => {
        navigate(`/producto/${producto.id}`);
    };

    return (
        <Card onClick={showDetails} className='tarjeta' sx={{borderRadius: 1, border:"1px solid #16213E"}}>
            <Box
                sx={{ 
                    display: "flex", 
                    justifyContent: "center",
                }}
            ><CardMedia
                    component="img" className='media'
                    sx={{objectFit: "contain"}}
                    image={producto.imagen}
                    alt={producto.nombre}
                />
            </Box>
            <CardContent>
                <Typography className='typo'>{producto.nombre}</Typography>
            </CardContent>
        </Card>
    );
};

