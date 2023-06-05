import React, { useState } from 'react'
import { es } from 'date-fns/locale';
import { registerLocale } from 'react-datepicker'
import DatePiker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import '../Style/Calendar.css'

const Calendar = () => {

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  registerLocale('es', es);

  const reserved = [
    {
      check_in_date: '2023-05-21',
      checkout_date: '2023-05-25',
    },
    {
      check_in_date: '2023-06-10',
      checkout_date: '2023-06-15',
    },
    {
      check_in_date: '2023-07-01',
      checkout_date: '2023-07-05',
    },
  ];

  const dateReserved = reserved?.map((reserva) => {
    return {
      start: new Date(reserva.check_in_date),
      end: new Date(reserva.checkout_date)
    }
  })


  return (
    <div className='picker'>
      <DatePiker
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        minDate={new Date()}
        dateFormat="dd/MM/yyyy"
        placeholderText="Fecha Inicial - Fecha Final"
        onChange={(update) => { setDateRange(update) }}
        locale="es"

        excludeDates={dateReserved}
        excludeDateIntervals={dateReserved}
      />

    </div>
  )
}

export default Calendar
