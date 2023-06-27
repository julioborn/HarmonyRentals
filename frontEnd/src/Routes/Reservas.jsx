import React from 'react';
import { useLocation } from 'react-router-dom';
import RentarProducto from '../Components/RentarProducto';
import { Box } from '@mui/system';

const Reservas = () => {
    const location = useLocation();
    const { producto, fechaDesdeDate, fechaHastaDate } = location.state;

    return (
        <div>
            <Box sx={{mt:15, mb:9, width:"100%"}}>
                <RentarProducto
                    producto={producto}
                    fechaDesdeDate={fechaDesdeDate}
                    fechaHastaDate={fechaHastaDate}
                />
            </Box>
        </div>
    );
};

export default Reservas;
