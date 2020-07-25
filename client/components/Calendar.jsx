import React from 'react';
import styled from 'styled-components';
import Page from './Page.jsx';

const Section = styled.section`
  height: 454.53px;
  width: 653.33px;
  font-family: Poppins;
`

const Head = styled.div`
  height: 65.73px;
  width: 653.33px;
  padding: 5px;
`

const Window = styled.div`
  height: 370px;
  width: 653.33px;
  overflow: hidden;
  position: relative;
`

const Roll = styled.div`
  height: 370px !important;
  width: 5000px !important;
  position: absolute !important;
  display: block;
  position: absolute;
  z-index: 0 !important;
  transform: ${props => `translate(-${props.page}px, 0px)`};
`

const HeadTitle = styled.h2`
  font-size: 22px !important;
  margin: 1px 0px;
  vertical-align: top;
  font-weight: 400;
`

const HeadSubtitle = styled.p`
  margin-top: 0px;
  font-size: 16px !important;
`

const ScrollLeft = styled.div`
  width: 25px;
  height: 25px;
  font-size: 18px;
  float: left;
  transform: translate(50px, 30px);
  text-align: center;
  border-radius: 50px;
  position: absolute;
  z-index: 1;
  &:hover {
    background: #F7F7F7;
    cursor: pointer;
  }
  ${({ page }) => page <= 0 && `
    pointer-events: none;
    color: white;
  `}
`

const ScrollRight = styled.div`
  width: 25px;
  height: 25px;
  text-align: center;
  border-radius: 50px;
  font-size: 18px;
  position: absolute;
  transform: translate(575px, 30px);
  z-index: 5;
  &:hover {
    background: #F7F7F7;
    cursor: pointer;
  }
  ${({ page }) => page >= 3230 && `
    pointer-events: none;
    color: white;
  `}
`;

const ClearDates = styled.p`
  font-size: 14px;
  font-weight: 500;
  text-decoration: underline;
  float: right;
  &:hover {
    cursor: pointer;
  }
`

//function to help pull available for each month that we create a Page for
const getMonthData = (monthName, data) => {
  let datesForMonth = data.filter(date => {
    //TODO check to make sure this works in evening
    let details = new Date(date.date + ' 12:00:00').toString().split(' ');
    let currentMonthName = details[1] + ' ' + details[3]
    //TODO REMOVE LOGS
    // console.log(date.date)
    // console.log(currentMonthName)
    return monthName === currentMonthName;
  })

  return datesForMonth;
}

const Calendar = ({ listingData, selectDate, page, nextPage, prevPage, clearDates }) => {


  //Calendar has Header and a window containing the pages
  //Roll is a very long div that has every page mapped out along it
  //User will be able to click and slide the Roll left to display future months

  return (
    <Section>
      <Head>
        <HeadTitle>Select check-in date</HeadTitle>
        <HeadSubtitle>Add your travel dates for exact pricing</HeadSubtitle>
      </Head>
      <Window>
        <ScrollLeft onClick={(e) => prevPage(e)} page={page}>{'<'}</ScrollLeft>
        <ScrollRight onClick={(e) => nextPage(e)} page={page}>{'>'}</ScrollRight>
        <Roll page={page}>
          {Object.keys(listingData.allDates).map((month, index) => {
            return <Page monthDays={listingData.allDates[month]} monthName={month} monthData={getMonthData(month, listingData.availableDates)} selectDate={selectDate} key={index} />
          })}
        </Roll>
      </Window>
      <ClearDates onClick={() => clearDates()}>Clear Dates</ClearDates>
    </Section>
  )
}

export default Calendar;