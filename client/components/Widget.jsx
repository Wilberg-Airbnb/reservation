import React from 'react';
import styled from 'styled-components';
import GuestPicker from './GuestPicker.jsx';
import Calendar from './Calendar.jsx';
import arrow from '../assets/icons8-expand-arrow-50.png'

const formatCalInput = (bookDate) => {
  if (bookDate === "") { return "" }
  return new Date(bookDate).toISOString().slice(0, 10);
}

const Widget = ({ listingData, openGuests, handleGuests, selectDate, page, nextPage, prevPage, clearDates, openCalendar }) => {
  return (
    <Container>
      <Content>
        <WidgetHead id="widget-heading">
          <ReservationPrice id="night-price">${listingData.currentPrice} / night</ReservationPrice>
          <Rating id="avg-rating"><ReservationStar /> <AvgRateTxt>{listingData.avgRate}</AvgRateTxt></Rating>
        </WidgetHead>
        <BookPick id="calendar-picker">
          <CalPick onClick={() => openCalendar()}>
            <DatePick>
              <CheckTitle>Check-In</CheckTitle>
              {formatCalInput(listingData.checkIn)}
            </DatePick>
            <DatePick>
              <CheckTitle>Checkout</CheckTitle>
              {formatCalInput(listingData.checkOut)}
            </DatePick>
          </CalPick>
          {
            listingData.calendarPopup ?
              <CalendarWrapper>
                <Calendar listingData={listingData} selectDate={selectDate} page={page} nextPage={nextPage} prevPage={prevPage} clearDates={clearDates} />
              </CalendarWrapper>
              : null
          }
          <div>
            <Guests>GUESTS</Guests>
            <GuestCount>
              {
                listingData.adults > 1 || listingData.children > 0 ?
                  `${listingData.adults + listingData.children} guests`
                  : '1 guest'
              }
              {
                listingData.infants === 1 ?
                  `, ${listingData.infants} infant`
                  : null
              }
              {
                listingData.infants > 1 ?
                  `, ${listingData.infants} infants`
                  : null
              }
            </GuestCount>
            <GuestArrow onClick={() => openGuests()}/>
          </div>
        </BookPick>
        {listingData.guestOpen ? <GuestPicker listingData={listingData} openGuests={openGuests} handleGuests={handleGuests} /> : null}
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
  margin-left: 20px;
`

const ReservationPrice = styled.p`
  font-size: 16px;
`

const Rating = styled.span` 
  float: right;
  display: flex;
  width: 50px;
  height 25px;
  align-items: baseline;
  margin-left: 150px;
  margin-top: 20px;
`

const CalPick = styled.div`
  display: flex;
  width: 100%;
  border-radius: 12px;
  z-index: 20;
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
  background-image: url(${arrow});
`

const CalendarWrapper = styled.div`
  height: fit-content;
  width: fit-content;
  background: #FFFFFF;
  border: 1px solid rgb(221, 221, 221);
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 6px;
  position: absolute;
  z-index: 10;
  transform: translate(-380px, -66px);
  padding: 10px;
`

const ReservationStar = styled.div`
  background: #ff385c;
  -webkit-clip-path: polygon(
    50% 0%,
    61% 35%,
    98% 35%,
    68% 57%,
    79% 91%,
    50% 70%,
    21% 91%,
    32% 57%,
    2% 35%,
    39% 35%
  );
  clip-path: polygon(
    50% 0%,
    61% 35%,
    98% 35%,
    68% 57%,
    79% 91%,
    50% 70%,
    21% 91%,
    32% 57%,
    2% 35%,
    39% 35%
  );
  display: inline-block;
  height: 15px;
  width: 15px;
  margin-right: 4px;
`;

const AvgRateTxt = styled.div`
  font-size: 14px;
`

export default Widget