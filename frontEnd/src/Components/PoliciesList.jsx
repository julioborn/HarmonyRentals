import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Card, Typography } from "@mui/material";
import GppGoodIcon from '@mui/icons-material/GppGood';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';



const PoliciesList = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: '0.3rem' }} id='poliList'>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2em', }}>
                <Card sx={{ pr: 1.5, pb: 2, pl: 1, width: '260px' }}>
                    <h3 style={{ color: '#16213e', lineHeight: '2.5' }}><GppGoodIcon  sx={{color:'#16213e'}}/> Devolución</h3>
                    <Typography sx={{ marginLeft: '1.5em', textAlign: 'left' }}> Probá tu instrumento con la tranquilidad de devolverlo si no es de tu agrado.</Typography>
                </Card>
                <Card sx={{ pr: 1.5, pb: 2, pl: 1, width: '260px' }}>
                    <h3 style={{ color: '#16213e', lineHeight: '2.5' }}><AssignmentReturnIcon   sx={{color:'#16213e'}}/> Compra tu instrumento</h3>
                    <Typography sx={{ marginLeft: '1.5em', textAlign: 'left' }}> Renta tu instrumento durante 24 meses para tener la opción de  hacerlo tuyo.</Typography>
                </Card>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2em', }}>
                <Card sx={{ pr: 1.5, pb: 2, pl: 1, width: '260px' }}>
                    <h3 style={{ color: '#16213e', lineHeight: '2.5' }}><ReceiptLongIcon   sx={{color:'#16213e'}}/> Registración </h3>
                    <Typography sx={{ marginLeft: '1.5em', textAlign: 'left'}}> Es necesario registrarse en el sitio web para poder iniciar con el trámite de alquiler. </Typography>
                </Card>
                <Card sx={{ pr: 1.5, pb: 2, pl: 1, width: '260px' }}>
                    <h3 style={{ color: '#16213e', lineHeight: '2.5' }}><AssignmentReturnIcon   sx={{color:'#16213e'}}/> Retorno de instrumentos</h3>
                    <Typography sx={{ marginLeft: '1.5em', textAlign: 'left' }}> Maneja con flexibilidad tus días y horarios de devolución.</Typography>
                </Card>
            </Box>
        </Box>
    );
};

export default PoliciesList;
