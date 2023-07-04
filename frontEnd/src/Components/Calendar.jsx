import React, { useState, useEffect, useContext } from "react";
import { registerLocale } from "react-datepicker";
import { es } from "date-fns/locale";
import { Box } from "@mui/material";
import DatePiker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../Style/Calendar.css";
import { GlobalContext } from "../Context/GlobalContext";
const Calendar = ({ fixed, reservedDates, onDateRangeChange }) => {
  const { state, dispatch } = useContext(GlobalContext);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  registerLocale("es", es);

  useEffect(() => {
    const { dates } = state;
    if (dates && dates.startDate && dates.endDate) {
      setStartDate(dates.startDate);
      setEndDate(dates.endDate);
    }
  }, []);

  useEffect(() => {
    console.log("useEffectCalendar")
    console.log(startDate)
    console.log(endDate)
    console.log(state)
  }, [startDate, endDate]);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (!endDate || date > endDate) {
      setEndDate(null);
    }
    onDateRangeChange(date, endDate);

    dispatch({
      type: 'UPDATE_DATES',
      payload: {
        startDate: date,
        endDate: endDate,
      },
    });
  };

  const handleEndDateChange = (date) => {
    if (!startDate || date < startDate) {
      setStartDate(null);
    }
    setEndDate(date);
    onDateRangeChange(startDate, date);

    dispatch({
      type: 'UPDATE_DATES',
      payload: {
      startDate: startDate,
        endDate: date,
      },
    });
  };

  const excludeDateIntervals = reservedDates.map(
    ({ fecha_desde, fecha_hasta }) => {
      const start = new Date(fecha_desde);
      const end = new Date(fecha_hasta);
      return { start, end };
    }
  );
  return (
    <Box
      className={fixed ? "picker" : "picker"}
      id="calendarios"
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "0.5em",
        textAlign: "center",
        height: "18.45em",
        width: "30em",
      }}
    >
      {true ? (
        <>
          <DatePiker
            selected={startDate}
            onChange={handleStartDateChange}
            dateFormat="dd/MM/yyyy"
            locale="es"
            excludeDates={reservedDates}
            excludeDateIntervals={excludeDateIntervals}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            minDate={new Date()}
            placeholderText="Fecha Inicial"
            inline
          />
          <DatePiker
            selected={endDate}
            onChange={handleEndDateChange}
            dateFormat="dd/MM/yyyy"
            locale="es"
            excludeDates={reservedDates}
            excludeDateIntervals={excludeDateIntervals}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            placeholderText="Fecha Final"
            inline
          />
        </>
      ) : null}
    </Box>
  );
};

export default Calendar;
