import { MARKET_URL } from '../../constants/url';
import { fetchInstance } from '../instance/index';

export const getMarket = async () => {
  const { data } = await fetchInstance().get(MARKET_URL);

  return data;
};
