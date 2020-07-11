import React from 'react';
import styled from 'styled-components';

//helper function to create 21 DayWeek divs (temp)
const renderDays = () => {
  let result = [];
  for (var i = 0; i < 31; i++) {
    result.push(i + 1);
  }

  return result;
};

const Page = (props) => {

  //Page Element Styles

  const Month = styled.div`
    height: 370px;
    width: 323px;
    border: 1px solid black;
    display: inline-block;
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
  `

  const DayPicker = styled.section`
    width: 100%;
  `

  //Page rendering header with days of the week & temporary map of all days in the month
  return (
    <Month>
      <MonthHeader>
        <h6>Month 2020</h6>
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
        {renderDays().map(x => <DayWeek>{x}</DayWeek>)}
      </DayPicker>
    </Month>
  )
}

export default Page;