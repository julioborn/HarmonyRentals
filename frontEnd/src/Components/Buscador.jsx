import React, { useState } from 'react'
import { Box, TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Calendar from './Calendar';
import '../Style/Buscador.css'


const Buscador = () => {

    return (
        <Box>
            <Box>
                <Box className='boxBuscar'>
                    <TextField
                        id="search-input"
                        label="Busca tu instrumento para alquilar"
                        type="search"
                        variant="outlined"
                        size="small"
                        className='input'
                        sx={{borderRadius:1}}
                    />
                    <Box className='date'>
                        <Calendar/>
                    <Button className='btnBuscar'>
                        <SearchIcon />
                    </Button>
                    </Box>
                </Box>
            </Box>
        </Box >
    )
}

export default Buscador