import React from "react";
import { Box, Card, Typography } from "@mui/material";
import GppGoodIcon from '@mui/icons-material/GppGood';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import "../Style/ProductoDetalle.css"

const PoliciesList = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1rem', mt:2.8 }} id='poliList'>
            <Box className="boxpoli" sx={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
                <Card className='cardsList
                ' sx={{ pr: 1.5, pb: 2, pl: 1, minWidth: '240px', width: '12vw', height: "150px" }}>
                    <h3 style={{ color: '#16213e', lineHeight: '2.5' }}><GppGoodIcon sx={{ color: '#16213e' }} /> Satisfacción</h3>
                    <Typography sx={{ marginLeft: '1.5em', textAlign: 'left', fontSize: '14px' }}> Probá tu instrumento con la tranquilidad de devolverlo si no es de tu agrado.</Typography>
                </Card>
                <Card className='cardsList
                ' sx={{ pr: 1.5, pb: 2, pl: 1, minWidth: '240px', width: '12vw', height: "150px" }}>
                    <h3 style={{ color: '#16213e', lineHeight: '2.5' }}><AssignmentReturnIcon sx={{ color: '#16213e' }} /> Compra</h3>
                    <Typography sx={{ marginLeft: '1.5em', textAlign: 'left', fontSize: '14px' }}> Renta tu instrumento durante 24 meses para tener la opción de  hacerlo tuyo.</Typography>
                </Card>
            </Box>

            <Box className="boxpoli" sx={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
                <Card className='cardsList
                ' sx={{ pr: 1.5, pb: 2, pl: 1, minWidth: '240px', width: '12vw', height: "150px" }}>
                    <h3 style={{ color: '#16213e', lineHeight: '2.5' }}><ReceiptLongIcon sx={{ color: '#16213e' }} /> Registro </h3>
                    <Typography sx={{ marginLeft: '1.5em', textAlign: 'left', fontSize: '14px' }}> Registrate en pocos pasos para acceder a nuestros servicios.</Typography>
                </Card>
                <Card className='cardsList
                ' sx={{ pr: 1.5, pb: 2, pl: 1, minWidth: '240px', width: '12vw', height: "150px" }}>
                    <h3 style={{ color: '#16213e', lineHeight: '2.5' }}><AssignmentReturnIcon sx={{ color: '#16213e' }} /> Retorno</h3>
                    <Typography sx={{ marginLeft: '1.5em', textAlign: 'left', fontSize: '14px' }}> Maneja con flexibilidad tus días y horarios de devolución.</Typography>
                </Card>
            </Box>
        </Box>
    );
};

export default PoliciesList;
