import React, { useState, useEffect } from 'react';
import {
  Box,
  StepLabel,
  Step,
  Stepper,
  ThemeProvider,
  createTheme,
} from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#16213E',
    },
    text: {
      primary: '#888',
      secondary: '#888',
    },
  },
});

const PasosDeBusqueda = ({
  inputBuscador,
  fechaDesde,
  fechaHasta,
  isSubmitted,
  resetPasos, // New prop to track search submission from another component
}) => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (activeStep === 0 && inputBuscador) {
      setActiveStep(1);
    } else if (
      activeStep === 1 &&
      inputBuscador &&
      fechaDesde &&
      fechaHasta
    ) {
      setActiveStep(2);
    } else if (
      activeStep === 2 &&
      inputBuscador &&
      fechaDesde &&
      fechaHasta &&
      isSubmitted
    ) {
      setActiveStep(3);
    }
  }, [inputBuscador, fechaDesde, fechaHasta, isSubmitted]);

  useEffect(() => {
    // Reset active step when resetPasos prop changes
    if (resetPasos) {
      setActiveStep(0);
    }
  }, [resetPasos]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: '100%', mt: '3vh', mb: '3vh' }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          <Step>
            <StepLabel>Elige instrumento</StepLabel>
          </Step>
          <Step>
            <StepLabel>Selecciona fechas</StepLabel>
          </Step>
          <Step>
            <StepLabel>Buscar</StepLabel>
          </Step>
        </Stepper>

        {activeStep === 0 && (
          <div>
            {/* Your "Elige instrumento" component */}
          </div>
        )}

        {activeStep === 1 && (
          <div>
            {/* Your "Elige fecha" component */}
          </div>
        )}

        {activeStep === 2 && (
          <div>
            {/* Step 3 component */}
          </div>
        )}

        {activeStep === 3 && (
          <div>
            {/* Step 4 component */}
          </div>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default PasosDeBusqueda;
