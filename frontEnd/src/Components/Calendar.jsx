
import React, { useState, useEffect } from 'react';
import { registerLocale } from 'react-datepicker';
import { es } from 'date-fns/locale';
import { Box, Button, Card } from '@mui/material';
import DatePiker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../Style/Calendar.css';

const Calendar = ({ fixed, reservedDates }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  registerLocale('es', es);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (!endDate || date > endDate) {
      setEndDate(null);
    }
  };

  const handleEndDateChange = (date) => {
    if (!startDate || date < startDate) {
      setStartDate(null);
    }
    setEndDate(date);
  };

  const excludeDateIntervals = reservedDates.map(({ fecha_desde, fecha_hasta }) => {
    const start = new Date(fecha_desde);
    const end = new Date(fecha_hasta);
    return { start, end };
  });
  return (
    <Box>
      <Card className={fixed ? 'picker' : 'picker'} id='calendarios'
        sx={{ 
          // backgroundColor: '#e2e9f5',
          textAlign: 'center', 
          height: '18em', 
          width: '32em', 
          display: 'flex', 
          flexDirection: 'row', 
          alignItems:'center',
          justifyContent: 'center',
          mb:7   
          }}>
        {true ? (
          <>
            <DatePiker
              selected={startDate}
              onChange={handleStartDateChange}
              dateFormat='dd/MM/yyyy'
              locale='es'
              excludeDates={reservedDates}
              excludeDateIntervals={excludeDateIntervals}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              placeholderText='Fecha Inicial'
              inline
            />
            <DatePiker
              selected={endDate}
              onChange={handleEndDateChange}
              dateFormat='dd/MM/yyyy'
              locale='es'
              excludeDates={reservedDates}
              excludeDateIntervals={excludeDateIntervals}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText='Fecha Final'
              inline
            />
          </>
        ) : null}
      </Card>
    </Box>
  );
};

export default Calendar;