import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';

const Calendar = lazy(() => import('./Calendar.jsx'));
const renderLoader = () => <p>Loading...</p>

function CalendarPortal({ listingData, selectDate, page, nextPage, prevPage, clearDates, openCalendar }) {
  return ReactDOM.createPortal(
    <Suspense fallback={renderLoader()}>
      <Calendar listingData={listingData} selectDate={selectDate} page={page} nextPage={nextPage} prevPage={prevPage} clearDates={clearDates} />
    </Suspense>,
    document.getElementById('reservation-calendar')
  )
}

export default CalendarPortal
