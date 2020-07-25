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
  display: inline-block;
`

const GuestSelectLeft = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid #717171;
  border-radius: 32px;
  text-align: center;
  margin-top: 0px;
  float: left;
  cursor: pointer;
`

const GuestSelectRight = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid #717171;
  border-radius: 32px;
  text-align: center;
  margin-top: 0px;
  float: right;
  cursor: pointer;
`

const GuestFont = styled.p`
  font-size: 12px;
  margin-top: 0px;
  position: absolute;
  transform: translate(6px, -0.75px);
`
const GuestSpanLeft = styled.span`
  width: 75px;
  height: 32px;
  border: 1px none black;
  float: left;
  margin-top: 40px;
`

const GuestSpanRight = styled.span`
  width 150px;
  height: 32px;
  border: 1px none black;
  float: right;
  text-align: center;
  margin-top: 40px;
  vertical-align: text-bottom;
`

const GuestClose = styled.p`
  float: right;
  text-decoration: underline;
  margin-top: 70px;
  cursor: pointer;
`

const GuestPicker = ({ openGuests, handleGuests, listingData }) => {
  return (
    <GuestContainer>
      <GuestSpanLeft>
        Adults
      </GuestSpanLeft>
      <GuestSpanRight>
        <GuestSelectLeft onClick={(e) => handleGuests('adults', false)}><GuestFont>-</GuestFont></GuestSelectLeft>
        {listingData.adults}
        <GuestSelectRight onClick={(e) => handleGuests('adults', true)}><GuestFont>+</GuestFont></GuestSelectRight>
      </GuestSpanRight>
      <GuestSpanLeft>
        Children
      </GuestSpanLeft>
      <GuestSpanRight>
        <GuestSelectLeft onClick={(e) => handleGuests('children', false)}><GuestFont>-</GuestFont></GuestSelectLeft>
        {listingData.children}
        <GuestSelectRight onClick={(e) => handleGuests('children', true)}><GuestFont>+</GuestFont></GuestSelectRight>
      </GuestSpanRight>
      <GuestSpanLeft>
        Infants
      </GuestSpanLeft>
      <GuestSpanRight>
        <GuestSelectLeft onClick={(e) => handleGuests('infants', false)}><GuestFont>-</GuestFont></GuestSelectLeft>
        {listingData.infants}
        <GuestSelectRight onClick={(e) => handleGuests('infants', true)}><GuestFont>+</GuestFont></GuestSelectRight>
      </GuestSpanRight>
      <GuestClose onClick={() => openGuests()}>Close</GuestClose>
    </GuestContainer>
  )
}

export default GuestPicker
