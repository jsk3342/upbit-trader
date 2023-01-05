export default function socketDataEncoder(socketData) {
  const encoder = new TextDecoder('utf-8');
  const rawData = new Uint8Array(socketData);
  const data = JSON.parse(encoder.decode(rawData));

  return data;
}
