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
  height: 25px;
  width: 43.5px;
  border 1px solid black;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  border-radius: 100px;
  padding-top: 5px;
`

const Day = styled.div`
  height: 25px;
  width: 43.5px;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  border-radius: 100px;
  padding-top: 5px;
  text-decoration: line-through;
  color: grey;

  ${({ isAvailable }) => isAvailable && `
    text-decoration: none;
    color: black;
    &:hover {
      border 1px solid black;
    }
  `}

  &.selected {
    background: grey;
  }
`

const DayPicker = styled.section`
  width: 100%;
`

const Page = ({ monthDays, monthName, monthData, selectDate }) => {

  let paddedMonthDays = monthDays.slice();
  let startDay = paddedMonthDays[0].split(' ')[0]
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

        {createPad(startDay).forEach(pad => paddedMonthDays.unshift('  '))}

        {paddedMonthDays.map((x, index) => {

          let available = monthData.map(d => d.date.slice(8, 10))
          let dateId = x.slice(4) + ' ' + monthName
          if (available.indexOf(x.split(' ')[1]) !== -1) {
            return <Day isAvailable={true} key={index} onClick={(e) => {selectDate(e, monthName)}} id={dateId}>{x.split(' ')[1]}</Day>
          } else {
            return <Day isAvailable={false} key={index} id={dateId}>{x.split(' ')[1]}</Day>
          }

        })}
      </DayPicker>
    </Month>
  )
}

export default Page;