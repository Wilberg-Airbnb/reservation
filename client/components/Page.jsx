import React from 'react';
import styled from 'styled-components';

//helper function to add padding according to what day of the week the month starts on

const createPad = (day) => {
  let dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  let padding = dayNames.indexOf(day);
  return [...Array(padding).keys()];
}

//Page Element Styles

const Month = styled.div`
  height: 370px;
  width: 323px;
  border: 1px solid black;
  display: inline-block;
  vertical-align: top;
`

const MonthHeader = styled.section`
  height: 91px;
  width: 100%;
`

const Week = styled.div`
  height: 32px;
  width: 100%;
  border: 1px solid black;
`
const DayWeek = styled.div`
  height: 32px;
  width: 43.5px;
  border 1px solid black;
  display: inline-block;
  vertical-align: top;
`

const DayPicker = styled.section`
  width: 100%;
`

const Page = ({ monthDays, monthName }) => {


  //Page rendering header, loads padding depending on month start and renders all days for month
  //TODO Change tests to match new props for unit testing

  return (
    <Month>
      <MonthHeader>
        <h6>{monthName}</h6>
        <Week>
          <DayWeek>M</DayWeek>
          <DayWeek>T</DayWeek>
          <DayWeek>W</DayWeek>
          <DayWeek>Th</DayWeek>
          <DayWeek>F</DayWeek>
          <DayWeek>S</DayWeek>
          <DayWeek>S</DayWeek>
        </Week>
      </MonthHeader>
      <DayPicker>
        {createPad(monthDays[0].split(' ')[0]).forEach(pad => monthDays.unshift('Pad 00'))}
        {monthDays.map((x, index) => <DayWeek key={index}>{x.split(' ')[1]}</DayWeek>)}
      </DayPicker>
    </Month>
  )
}

export default Page;