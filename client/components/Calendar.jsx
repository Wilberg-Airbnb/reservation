import React from 'react';
import styled from 'styled-components';

const Calendar = (props) => {

  const Section = styled.section`
    height: 454.53px;
    width: 615.73px;
    border: 1px solid black;
  `

  const Head = styled.div`
    height: 65.73px;
    width: 615.73px;
  `

  const Window = styled.div`
    height: 385px;
    width: 615.73px;
    overflow: hidden;
    position: relative;
  `

  const Roll = styled.div`
    height: 338.77 !important;
    width: 5000px !important;
    transform: translateX(0px);
    position: absolute !important;
    border: 1px solid black;
    display: block;
    position: absolute;
    z-index: 0 !important;
  `

  const Page = styled.div`
    height: 338.77px;
    width: 321.52px;
    border: 1px solid black;
    display: inline-block;
  `

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