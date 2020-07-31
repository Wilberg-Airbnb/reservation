import React from 'react';
import ReactDOM from 'react-dom';
import Mini from './Mini.jsx'

const MiniPortal = () => {
  return ReactDOM.createPortal(
    <div>
      <Mini/>
    </div>,
    document.getElementById('reservation-mini')
  )
}

export default MiniPortal