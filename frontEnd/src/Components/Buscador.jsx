import React, { useState } from 'react';
import { Box, TextField, Button, Autocomplete } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Calendar from './Calendar';
import '../Style/Buscador.css';

const CustomTextField = React.forwardRef(({ InputProps, ...props }, ref) => (
  <TextField
    {...props}
    InputProps={{
      ...InputProps,
      endAdornment: null, // Remove the clear icon
    }}
    ref={ref}
  />
));

const Buscador = () => {
  const [searchValue, setSearchValue] = useState('');
  const [predictions, setPredictions] = useState([]);

  const performSearch = async (value) => {
    try {
      const response = await fetch(`http://3.145.94.82:8080/producto/busca?query=${value}`);
      const data = await response.json();
      console.log('API Response:', data);
      return data || [];
    } catch (error) {
      console.error('Error performing search:', error);
      return [];
    }
  };

  const handleSearchChange = async (event) => {
    const { value } = event.target;
    setSearchValue(value);
    const databasePredictions = await performSearch(value);
    setPredictions(databasePredictions);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const searchSubmitResult = await performSearch(searchValue);
    console.log(searchSubmitResult)
  };

  const renderOption = (option) => option.nombre;

  return (
    <form className="boxBuscar" onSubmit={handleSearchSubmit}>
      <Autocomplete
        id="search-input"
        options={predictions.slice(0, 3)}
        getOptionLabel={renderOption}
        renderInput={(params) => (
          <CustomTextField
            {...params}
            name="searchValue"
            label="Buscar instrumento..."
            type="search"
            size="small"
            sx={{ borderRadius: 1}}
            value={searchValue}
            onChange={handleSearchChange}
          />
        )}
        renderOption={(props, option) => (
          <li {...props}>{option.nombre}</li>
        )}
      />
      <Box className="date">
        <Button className="btnBuscar" type="submit">
          <SearchIcon />
        </Button>
      </Box>
    </form>
  );
};

export default Buscador;
