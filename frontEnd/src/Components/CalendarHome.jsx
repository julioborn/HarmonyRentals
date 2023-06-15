import React, { useState, useEffect } from "react";
import { es } from "date-fns/locale";
import { registerLocale } from "react-datepicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Box } from "@mui/material";
import "../Style/Calendar.css";


const CalendarHome = ({ onDateRangeChange, productoId }) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [isLoading, setIsLoading] = useState(true);
  registerLocale("es", es);

  const handleDateChange = (update) => {
    setDateRange(update);
    const [startDate, endDate] = update;
    onDateRangeChange(startDate, endDate);
  };

  const [reserved, setReserved] = useState([]);

  useEffect(() => {
    if (productoId) {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://3.145.94.82:8080/alquiler/producto/${productoId}/fechas`);
          const data = await response.json();
          setReserved(data);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
    }
  }, [productoId]);

  const excludeDateIntervals = reserved.map(({ fecha_desde, fecha_hasta }) => {
    const start = new Date(fecha_desde);
    const end = new Date(fecha_hasta);
    return { start, end };
  });

  const placeholderStyle = {
    fontFamily: "Lato, sans-serif", // Set the desired font-family
  };

  return (
    <Box
      className="picker"
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <DatePicker
        className="datePickerHome"
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        minDate={new Date()}
        dateFormat="dd-MM-yyyy"
        placeholderText="Fechas"
        onChange={handleDateChange}
        locale="es"
        excludeDateIntervals={excludeDateIntervals}
        placeholderStyle={placeholderStyle}
      />
    </Box>
  );
};

export default CalendarHome;
