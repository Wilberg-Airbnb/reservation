import React from 'react'
import styled from 'styled-components';

const GuestContainer = styled.div`
  width: 280px;
  height: 320px;
  border: 1px solid rgb(221, 221, 221);
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 6px;
  position: absolute;
  transform: translate(20px, 0px);
  z-index: 999;
  background: #FFFFFF;
  padding: 16px;
  display: inline-block;
`

const GuestSelectLeft = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid #717171;
  border-radius: 32px;
  text-align: center;
  margin-top: 0px;
  float: left;
`

const GuestSelectRight = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid #717171;
  border-radius: 32px;
  text-align: center;
  margin-top: 0px;
  float: right;
`

const GuestFont = styled.p`
  font-size: 14px;
  margin-top: 0px;
`

const GuestCategory = styled.p`
  font-size: 24px;
`
const GuestRow = styled.div`
  width: 100%;
  height: 32px;
`
const GuestNum = styled.div`
  
`
const GuestSpanLeft = styled.span`
  width: 75px;
  height: 32px;
  border: 1px none black;
  float: left;
  margin-top: 40px;
`

const GuestSpanRight = styled.span`
  width 150px;
  height: 32px;
  border: 1px none black;
  float: right;
  text-align: center;
  margin-top: 40px;
  vertical-align: text-bottom;
`

const GuestPicker = (props) => {
  return (
    <GuestContainer>
      <GuestSpanLeft>
        Adults
      </GuestSpanLeft>
      <GuestSpanRight>
        <GuestSelectLeft><GuestFont>-</GuestFont></GuestSelectLeft>
        5
        <GuestSelectRight><GuestFont>+</GuestFont></GuestSelectRight>
      </GuestSpanRight>
      <GuestSpanLeft>
        Adults
      </GuestSpanLeft>
      <GuestSpanRight>
        <GuestSelectLeft><GuestFont>-</GuestFont></GuestSelectLeft>
        2
        <GuestSelectRight><GuestFont>+</GuestFont></GuestSelectRight>
      </GuestSpanRight>
      <GuestSpanLeft>
        Infants
      </GuestSpanLeft>
      <GuestSpanRight>
        <GuestSelectLeft><GuestFont>-</GuestFont></GuestSelectLeft>
        1
        <GuestSelectRight><GuestFont>+</GuestFont></GuestSelectRight>
      </GuestSpanRight>
    </GuestContainer>
  )
}

export default GuestPicker
