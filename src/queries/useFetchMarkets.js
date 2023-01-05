import { useQuery } from 'react-query';
import { getMarket } from '../api/base/market';
import { MARKET_URL } from '../constants/url';

export const useFetchMarkets = () => {
  const { data: markets } = useQuery(MARKET_URL, () => getMarket());
  return markets;
};

