import React from 'react';
import ReactDOM from 'react-dom';
import Widget from './Widget.jsx';

function WidgetPortal({ listingData, openGuests, handleGuests, selectDate, page, nextPage, prevPage, clearDates, openCalendar }) {
  return ReactDOM.createPortal(
    <div>
      <Widget listingData={listingData} openGuests={openGuests} handleGuests={handleGuests} selectDate={selectDate} page={page} nextPage={nextPage} prevPage={prevPage} clearDates={clearDates} openCalendar={openCalendar}/>
    </div>,
    document.getElementById('reservation-widget')
  )
}

export default WidgetPortal
