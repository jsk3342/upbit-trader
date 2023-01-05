import { useEffect, useRef, useState } from 'react';
import { SOCKET_URL } from '../constants/url';
import socketDataEncoder from '../service/socketDataEncoder';

export default function useSocket(
  markets = [
    {
      market: 'KRW-BTC',
      korean_name: '비트코인',
      english_name: 'Bitcoin',
    },
  ],
  type = 'ticker',
  options = { throttle_time: 400, max_length_queue: 100 },
) {
  const { throttle_time, max_length_queue } = options;

  const socket = useRef(null);

  const [isConnected, setIsConnected] = useState(false);
  const [socketData, setSocketData] = useState();

  useEffect(() => {
    socket.current = new WebSocket(SOCKET_URL);
    socket.current.binaryType = 'arraybuffer';

    const handleOnSocketOpen = () => {
      console.log('SUBSCRIBE WEBSOCKET', type);
      setIsConnected(true);

      const sendContent = [
        { ticket: 'test' },
        {
          type: type,
          codes: markets.map((code) => code.market),
        },
      ];
      socket.current.send(JSON.stringify(sendContent));
      console.log('message sending done');
    };

    const handleOnSocketMessage = (event) => {
      const data = socketDataEncoder(event.data);
      setSocketData(data);
    };

    const handleOnSocketClose = () => {
      setIsConnected(false);
      setSocketData(null);
      console.log('연결 종료');
    };

    const handleOnSocketError = (error) => {
      console.error('[Error]', error);
    };

    //보일러플레이트 만드는 방향으로 진행
    socket.current.addEventListener('message', handleOnSocketMessage);
    socket.current.addEventListener('open', handleOnSocketOpen);
    socket.current.addEventListener('close', handleOnSocketClose);
    socket.current.addEventListener('error', handleOnSocketError);

    //새로 고침 시 소켓 연결 해제
    window.addEventListener('beforeunload', (event) => {
      handleOnSocketClose();
    });

    return () => {
      if (socket.current?.readyState === 1) {
        console.log('언마운트로 인한 소켓 종료 PRICE');
        socket.current.close();
        socket.current = null;
      }
    };
  }, []);

  return { socket: socket.current, isConnected, socketData };
}
