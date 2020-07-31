import React from 'react'
import styled from 'styled-components';

const MiniContainer = styled.aside`
  #reservation-mini & {
    width: 200px;
    height: 50px;
    border: solid black 1px;
  }
`

const Mini = () => {
  return (
    <MiniContainer>
      hello world
    </MiniContainer>
  )
}

export default Mini;