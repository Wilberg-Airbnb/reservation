import React from 'react'
import styled from 'styled-components';

const GuestContainer = styled.div`
  width: 280px;
  height: 320px;
  border: 1px solid rgb(221, 221, 221);
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 6px;
  position: absolute;
  transform: translate(20px, 0px);
  z-index: 999;
  background: #FFFFFF;
  padding: 16px;
`

const GuestCategory = styled.p`
  font-size: 14px,
`

const GuestPicker = (props) => {
  return (
    <GuestContainer>
      <div>
        <GuestCategory>Adults</GuestCategory>
      </div>
      <div>
        <GuestCategory>Children</GuestCategory>
      </div>
      <div>
        <GuestCategory>Infants</GuestCategory>
      </div>
    </GuestContainer>
  )
}

export default GuestPicker
