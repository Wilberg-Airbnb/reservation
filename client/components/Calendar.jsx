import React from 'react';
import styled from 'styled-components';
import Page from './Page.jsx';

const Section = styled.section`
  height: 454.53px;
  width: 653.33px;
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
  transform: translateX(0px);
  position: absolute !important;
  display: block;
  position: absolute;
  z-index: 0 !important;
`

const HeadTitle = styled.h2`
  margin: 1px 0px;
  vertical-align: top;
`

const HeadSubtitle = styled.p`
  margin-top: 0px;
`

//function to help pull available for each month that we create a Page for
const getMonthData = (monthName, data) => {
  let datesForMonth = data.filter(date => {
    let details = new Date(date.date).toString().split(' ');
    let currentMonthName = details[1] + ' ' + details[3]
    return monthName === currentMonthName;
  })

  return datesForMonth;
}

const Calendar = ({ listingData, selectDate }) => {


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
        <Roll>
          {Object.keys(listingData.allDates).map((month, index) => {
            return <Page monthDays={listingData.allDates[month]} monthName={month} monthData={getMonthData(month, listingData.availableDates)} selectDate={selectDate} key={index}/>
          })}
        </Roll>
      </Window>
    </Section>
  )
}

export default Calendar;