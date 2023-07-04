import React from 'react';
import { useLocation } from 'react-router-dom';
import RentarProducto from '../Components/RentarProducto';
import { Box } from '@mui/system';
import NewRentarProducto from '../Components/Reserva/NewRentarProducto';
const Reservas = () => {
    const location = useLocation();
    const { producto, fechaDesdeDate, fechaHastaDate } = location.state;

    return (
        <div>
            <Box sx={{mt:15, mb:9, width:"100%"}}>
               
               <NewRentarProducto
                producto={producto}
                fechaDesdeDate={fechaDesdeDate}
                fechaHastaDate={fechaHastaDate}/>
               {/*
                 <RentarProducto
                    producto={producto}
                    fechaDesdeDate={fechaDesdeDate}
                    fechaHastaDate={fechaHastaDate}
                />
                */}
            </Box>
        </div>
    );
};

export default Reservas;
