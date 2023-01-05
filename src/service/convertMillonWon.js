export default function convertMillonWon(value) {
  const MILLION = 1000000;
  const extractedValue = value / MILLION;
  return extractedValue;
}
