import React from 'react';
import styled from 'styled-components';
import Page from './Page.jsx';

const Calendar = (props) => {

  const Section = styled.section`
    height: 454.53px;
    width: 653.33px;
    border: 1px solid black;
  `

  const Head = styled.div`
    height: 65.73px;
    width: 653.33px;
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
    border: 1px solid black;
    display: block;
    position: absolute;
    z-index: 0 !important;
  `

  //Calendar has Header and a window containing the pages
  //Roll is a very long div that has every page mapped out along it
  //User will be able to click and slide the Roll left to display future months

  return (
    <Section>
      <Head>
        <h2>Select check-in date</h2>
        <p>Add your travel dates for exact pricing</p>
      </Head>
      <Window>
        <Roll>
          <Page/>
          <Page/>
          <Page/>
          <Page/>
        </Roll>
      </Window>
    </Section>
  )
}

export default Calendar;