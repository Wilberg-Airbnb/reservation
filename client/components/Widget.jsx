import React from 'react';
import styled from 'styled-components';
// import React from 'react-dom';

const Widget = ({listingData}) => {
  return (
    <Container>
      <Content>
        <WidgetHead id="widget-heading">
          <p id="night-price">${listingData.standardPrice} / night</p>
          <Rating id="avg-rating">⭐️ 4.90 (323)</Rating>
        </WidgetHead>
        <BookPick id="calendar-picker">
          <CalPick>
            <input type="date" id="datemin" name="datemin" value="2020-07-25"></input>
            <input type="date" id="datemax" name="datemax"></input>
          </CalPick>
          <p>GUESTS</p>
        </BookPick>

        <CheckButton id="check-available" onClick={(e) => this.handleClick(e)}>Check availability</CheckButton>
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

export default Widget