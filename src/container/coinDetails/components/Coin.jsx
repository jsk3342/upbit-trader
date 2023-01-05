import React from 'react';
import styled from 'styled-components';

const CoinBox = styled.div`
  height: 45px;
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr 1.3fr;
  border-bottom: 0.5px solid lightgrey;
  font-size: 12px;
  padding-left: 5px;
  padding-right: 5px;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? 'lightgrey' : 'inherit')};
  :hover {
    background-color: lightgrey;
  }
  div {
    display: flex;
  }
  div:nth-child(1) {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  div:nth-child(2) {
    justify-content: flex-end;
    align-items: center;
  }
  div:nth-child(3) {
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
  }
  div:nth-child(4) {
    justify-content: flex-end;
    align-items: center;
  }
`;

const CoinBoxName = styled.div`
  font-weight: 600;
  font-size: 11px;

  div:nth-child(2) {
    color: gray;
    font-weight: 400;
    font-size: 7px;
  }
`;

const CoinBoxPrice = styled.div`
  font-weight: 600;
  color: ${(props) => {
    switch (props.changeType) {
      case 'RISE':
        return '#EF1C1C';
      case 'EVEN':
        return '#000000';
      case 'FALL':
        return '#1261C4';
      default:
        return '#000000';
    }
  }};
`;

const CoinBoxChange = styled.div`
  color: ${(props) => {
    switch (props.changeType) {
      case 'RISE':
        return '#EF1C1C';
      case 'EVEN':
        return '#000000';
      case 'FALL':
        return '#1261C4';
      default:
        return '#000000';
    }
  }};
`;
const CoinBoxChangeRate = styled.div``;
const CoinBoxChangePrice = styled.div``;
const CoinBoxVolume = styled.div`
  font-size: 11px;
  div:nth-child(2) {
    color: grey;
  }
`;

export default function Coin() {
  return (
    <CoinBox>
      <CoinBoxName>
        <div>test</div>
      </CoinBoxName>
      <CoinBoxPrice>112</CoinBoxPrice>
      <CoinBoxChange>
        <CoinBoxChangeRate>0</CoinBoxChangeRate>
        <CoinBoxChangePrice>0</CoinBoxChangePrice>
      </CoinBoxChange>
      <CoinBoxVolume>
        <div>백만</div>
      </CoinBoxVolume>
    </CoinBox>
  );
}
