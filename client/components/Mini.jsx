import React from 'react'
import styled from 'styled-components';

const MiniContainer = styled.aside`
  #reservation-mini & {
    width: 200px;
    height: 50px;
    display: block;
    font-family: Poppins;
  }
`

const MiniButton = styled.button`
  #reservation-mini & {
    float: right;
    width: 100px;
    height: 50px;
    background: radial-gradient(#F83158, #D80866);
    color: rgb(255, 255, 255);
    border: 2px solid rgba(221, 221, 221, 0.12);
    border-radius: 12px;
  }
`

const MiniPrice = styled.p`
#reservation-mini & {
  width: 100px;
  height: 25px;
  margin: 0px 0px;
  font-size: 16px;
  font-weight: 200;
  display: flex;
}
`

const MiniRating = styled.aside`
#reservation-mini & {
  width: 50px;
  height 25px;
  margin: 0px 0px;
  display: flex;
}
`

const MiniStar = styled.aside`
#reservation-mini & {
  background: #ff385c;
  -webkit-clip-path: polygon(
    50% 0%,
    61% 35%,
    98% 35%,
    68% 57%,
    79% 91%,
    50% 70%,
    21% 91%,
    32% 57%,
    2% 35%,
    39% 35%
  );
  clip-path: polygon(
    50% 0%,
    61% 35%,
    98% 35%,
    68% 57%,
    79% 91%,
    50% 70%,
    21% 91%,
    32% 57%,
    2% 35%,
    39% 35%
  );
  height: 15px;
  width: 15px;
  margin-right: 5px;
  display: flex;
  }
`;

const MiniAvgRateTxt = styled.div`
#reservation-mini & {
  font-size: 14px;
  display: flex;
}
`

const Mini = ({ listingData }) => {
  return (
    <MiniContainer>
      <MiniButton>Reserve</MiniButton>
      <MiniPrice>${listingData.currentPrice} / night</MiniPrice>
      <MiniRating><MiniStar /><MiniAvgRateTxt>{listingData.avgRate}</MiniAvgRateTxt> </MiniRating>
    </MiniContainer>
  )
}

export default Mini;