export default function coinFilter(markets) {
  return markets.filter((item) => item.market === 'KRW-ETH');
}
