import React from 'react';
import styled from 'styled-components';
import { useFetchMarkets } from '../../queries/useFetchMarkets';
import Coin from './components/Coin';

const CoinListBox = styled.div`
  height: 800px;
  margin: 5px;
  background-color: white;
  overflow: overlay;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

const CoinBoxHeader = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 1px;
  background-color: white;
  opacity: 0.8;
  height: 35px;
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr 1.3fr;
  border-bottom: 0.5px solid lightgrey;
  font-size: 12px;
  font-weight: 600;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default function CoinDetails() {
  const markets = useFetchMarkets();
  console.log(markets);

  return (
    <div>
      <CoinListBox>
        <CoinBoxHeader>
          <div>코인</div>
          <div>현재가</div>
          <div>전일대비</div>
          <div>거래대금</div>
        </CoinBoxHeader>
        {markets.map((market) => (
          <Coin key={market.market} market={market}></Coin>
        ))}
      </CoinListBox>
    </div>
  );
}
