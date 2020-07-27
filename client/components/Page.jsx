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
  display: inline-block;
  vertical-align: top;
`

const MonthHeader = styled.section`
  height: 91px;
  width: 100%;
  text-align: center;
`

const MonthName = styled.h6`
  font-size: 16px !important;
  font-weight: 300 !important;
`

const Week = styled.div`
  height: 32px;
  width: 100%;
`

const DayWeek = styled.div`
  height: 25px;
  width: 43.5px;
  display: inline-block;
  vertical-align: middle;
  text-align: left;
  border-radius: 100px;
  padding-top: 5px;
  font-weight: 200;
  color: grey;
  font-size: 14px !important;
`
const Paragraph = styled.p`
  font-size: 14px !important;
`

const Day = styled.div`
  height: 25px;
  width: 43.5px;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  padding-top: 5px;
  text-decoration: line-through;
  color: grey;
  font-size: 16px;

  ${({ isAvailable }) => isAvailable && `
    text-decoration: none;
    color: black;
    &:hover {
      background: #F7F7F7;
      cursor: pointer;
    }
  `}

  &.selected {
    background: #F7F7F7;
    pointer-events: none;
  }
`

const DayPicker = styled.section`
  width: 100%;
  text-align: left;
  padding-top: 10px;
`

const Page = ({ monthDays, monthName, monthData, selectDate }) => {

  let paddedMonthDays = monthDays.slice();
  let startDay = paddedMonthDays[0].split(' ')[0]
  //Page rendering header, loads padding depending on month start and renders all days for month
  //TODO Change tests to match new props for unit testing

  return (
    <Month>
      <MonthHeader>
        <MonthName>{monthName}</MonthName>
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
            return <Day isAvailable={true} key={index} onClick={(e) => { selectDate(e) }} id={dateId}>{x.split(' ')[1]}</Day>
          } else {
            return <Day isAvailable={false} key={index} id={dateId}>{x.split(' ')[1]}</Day>
          }
        })}
      </DayPicker>
    </Month>
  )
}

export default Page;