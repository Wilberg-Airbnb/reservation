import React from 'react';
import ReactDOM from 'react-dom';
import Mini from './Mini.jsx'

const MiniPortal = ({ listingData }) => {
  return ReactDOM.createPortal(
    <div>
      <Mini listingData={listingData}/>
    </div>,
    document.getElementById('reservation-mini')
  )
}

export default MiniPortal