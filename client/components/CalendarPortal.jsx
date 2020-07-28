import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './Calendar.jsx';

function CalendarPortal({ listingData, selectDate, page, nextPage, prevPage, clearDates, openCalendar }) {
  return ReactDOM.createPortal(
    <div>
      <Calendar listingData={listingData} selectDate={selectDate} page={page} nextPage={nextPage} prevPage={prevPage} clearDates={clearDates} />
    </div>,
    document.getElementById('reservation-calendar')
  )
}

export default CalendarPortal
