import React from 'react';
import styled from 'styled-components';
import GuestPicker from './GuestPicker.jsx';

const formatCalInput = (bookDate) => {
  if (bookDate === "") { return "" }
  return new Date(bookDate).toISOString().slice(0, 10);
}

const Widget = ({ listingData, openGuests, handleGuests }) => {
  return (
    <Container>
      <Content>
        <WidgetHead id="widget-heading">
          <p id="night-price">${listingData.currentPrice} / night</p>
          <Rating id="avg-rating">⭐️ 4.90 (323)</Rating>
        </WidgetHead>
        <BookPick id="calendar-picker">
          <CalPick>
            <DatePick>
              <CheckTitle>Check-In</CheckTitle>
              {formatCalInput(listingData.checkIn)}
            </DatePick>
            <DatePick>
              <CheckTitle>Checkout</CheckTitle>
              {formatCalInput(listingData.checkOut)}
            </DatePick>
          </CalPick>
          <div>
            <Guests>GUESTS</Guests>
            <GuestCount>3 guests, 2 infants</GuestCount>
            <GuestArrow onClick={() => openGuests()}>{listingData.guestOpen ? '^' : 'v'}</GuestArrow>
          </div>
        </BookPick>
        {listingData.guestOpen ? <GuestPicker listingData={listingData} openGuests={openGuests} handleGuests={handleGuests}/> : null}
        <CheckButton id="check-available" onClick={(e) => this.handleClick(e)}>{!listingData.invoice ? 'Check availability' : 'Reserve'}</CheckButton>
        {!listingData.invoice ?
          null
          :
          <div>
            <ChargedText>You Won't be charged yet</ChargedText>
            <div>
              <SpanLeft>{`$${listingData.currentPrice} x ${listingData.availableDates.length - 1} nights`}</SpanLeft>
              <SpanRight>{`$${listingData.currentPrice * (listingData.availableDates.length - 1)}`}</SpanRight>
            </div>
            <div>
              <SpanLeft>Cleaning Fee</SpanLeft>
              <SpanRight>${listingData.cleaningFee}/night</SpanRight>
            </div>
            <div>
              <SpanLeft>Service Fee</SpanLeft>
              <SpanRight>{`$${Math.ceil((listingData.currentPrice * (listingData.availableDates.length - 1)) * .142)}`}</SpanRight>
            </div>
          </div>
        }
      </Content>
    </Container>
  )
}

const Container = styled.div`
  font-family: Poppins;
  font-weight: 400;
  font-size: 22px;
  line-height:26px;
  float: right;
  width: 338px;
  border: 2px solid rgb(221, 221, 221);
  padding: 24px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
  border-radius: 12px;
`;

const Content = styled.div`
  display: block;
  align: center;
  margin: auto;
`

const BookPick = styled.div`
  width: 288px;
  height: 112px;
  border: 2px solid rgb(221, 221, 221);
  border-radius: 12px;
  padding: 5px;
  margin: auto;
`
const ButtonPick = styled.div`
  width: 288;
  margin: auto;
  overflow: hidden;
`

const WidgetHead = styled.div`
  display: flex;
`

const Rating = styled.div` 
  margin-left: 200px;
  float: right;
`

const CalPick = styled.div`
  display: flex;
  width: 100%;
  border-radius: 12px
`

const DatePick = styled.div`
  width: 160px;
  height: 56px;
  overflow: hidden;
  cursor: pointer;
  display: block;
  vertical-align: text-top;
  font-size: 14px;
  border-bottom: 2px solid rgb(221, 221, 221);
`

const CheckTitle = styled.h6`
  margin-top: 0px;
  margin-bottom: 0px;
  font-size: 14px;
`

const CheckButton = styled.button`
display: block;
margin: auto;
margin-top: 20px;
width: 298px;
height: 48px;
background: radial-gradient(#F83158, #D80866);
color: rgb(255, 255, 255);
border: 2px solid rgba(221, 221, 221, 0.12);
border-radius: 12px;
`

const ChargedText = styled.p`
  font-size: 12px;
  text-align: center;
`

const SpanLeft = styled.span`
  text-align: left;
  font-size: 16px;
  padding-left: 20px;
`

const SpanRight = styled.span`
  text-align: right;
  font-size: 16px;
  padding-right: 20px;
  float: right;
`

const Guests = styled.h4`
  margin: 0px 1px;
  padding-bottom: 2px;
  font-size: 14px;
  font-weight: 100px;
  vertical-align: text-top;
`

const GuestCount = styled.p`
  font-size: 16px;
  font-weight: 100;
  margin: 0px 1px;
`

const GuestArrow = styled.div`
  width: 30px;
  height: 25px;
  float: right;
  border: 1px solid black;
  transform: translate(-10px, -40px);
  text-align: center;
  vertical-align: text-bottom;
  padding-top: 5px;
  border-radius: 20px;
`

export default Widget