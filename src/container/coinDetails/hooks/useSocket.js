export default useSocket () {
    targetMarketCodes: ImarketCodes[] = [
        {
          market: "KRW-BTC",
          korean_name: "비트코인",
          english_name: "Bitcoin",
        },
      ],
      type: RequestType = "ticker",
      options = { throttle_time: 400, max_length_queue: 100 }
    ) {
      const SOCKET_URL: string = "wss://api.upbit.com/websocket/v1";
      const { throttle_time, max_length_queue } = options;
      const socket = useRef<WebSocket | null>(null);
      const buffer = useRef<any[]>([] as any[]);
    
      const [isConnected, setIsConnected] = useState<boolean>(false);
      const [loadingBuffer, setLoadingBuffer] = useState<any>([]);
      const [socketData, setSocketData] = useState<any>();
    
      const throttled = useCallback(
        throttle(() => {
          try {
            const lastBuffers = getLastBuffers(
              buffer.current,
              targetMarketCodes.length
            );
    
            switch (type) {
              case "ticker":
                const sortedBuffers = sortBuffers(lastBuffers, targetMarketCodes);
                setLoadingBuffer(sortedBuffers);
                buffer.current = [];
                break;
    
              case "orderbook":
                if (lastBuffers) setSocketData(lastBuffers[0]);
                buffer.current = [];
                break;
    
              case "trade":
                const updatedBuffer = updateQueueBuffer(
                  buffer.current,
                  max_length_queue
                );
                buffer.current = updatedBuffer;
                setSocketData(updatedBuffer);
                break;
    
              default:
                break;
            }
          } catch (error) {
            throw new Error();
          }
        }, throttle_time),
        [targetMarketCodes]
      );
      // socket 세팅
      useEffect(() => {
        try {
          const isTypeValid = typeChecker(type);
          if (!isTypeValid) {
            console.error(
              "[Error] | input type is unknown. (input type should be 'ticker' or 'orderbook' or 'trade')"
            );
            throw new Error();
          }
    
          if (type === "orderbook" || type === "trade") {
            if (targetMarketCodes.length > 1) {
              console.error(
                "[Error] | 'Length' of Target Market Codes should be only 'one' in 'orderbook' and 'trade'. you can request only 1 marketcode's data, when you want to get 'orderbook' or 'trade' data."
              );
              throw new Error();
            }
          }
    
          if (targetMarketCodes.length > 0 && !socket.current) {
            socket.current = new WebSocket(SOCKET_URL);
            socket.current.binaryType = "arraybuffer";
    
            const socketOpenHandler = () => {
              setIsConnected(true);
              console.log("[연결완료] | socket Open Type: ", type);
              if (socket.current?.readyState == 1) {
                const sendContent = [
                  { ticket: "test" },
                  {
                    type: type,
                    codes: targetMarketCodes.map((code) => code.market),
                  },
                ];
                socket.current.send(JSON.stringify(sendContent));
                console.log("message sending done");
              }
            };
    
            const socketCloseHandler = () => {
              setIsConnected(false);
              setLoadingBuffer([]);
              setSocketData(null);
              buffer.current = [];
              console.log("연결종료");
            };
    
            const socketErrorHandler = (error: any) => {
              console.error("[Error]", error);
            };
    
            const socketMessageHandler = (evt: MessageEvent) => {
              const data = socketDataEncoder(evt.data);
              buffer.current.push(data);
              throttled();
            };
    
            socket.current.onopen = socketOpenHandler;
            socket.current.onclose = socketCloseHandler;
            socket.current.onerror = socketErrorHandler;
            socket.current.onmessage = socketMessageHandler;
          }
          return () => {
            if (socket.current) {
              if (socket.current.readyState != 0) {
                socket.current.close();
                socket.current = null;
              }
            }
          };
        } catch (error) {
          throw new Error();
        }
      }, [targetMarketCodes]);
    
      useEffect(() => {
        try {
          if (loadingBuffer.length > 0) {
            if (!socketData) {
              setSocketData(loadingBuffer);
            } else {
              setSocketData((prev: any) => {
                return updateSocketData(prev, loadingBuffer);
              });
              setLoadingBuffer([]);
            }
          }
        } catch (error) {
          console.log(error);
        }
      }, [loadingBuffer]);
    
      return { socket: socket.current, isConnected, socketData };
    }
    
    export function useFetchMarketCode() {
      const REST_API_URL: string =
        "https://api.upbit.com/v1/market/all?isDetails=false";
      const options = { method: "GET", headers: { Accept: "application/json" } };
    
      const [isLoading, setIsLoading] = useState<boolean>(true);
      const [marketCodes, setMarketCodes] = useState<ImarketCodes[]>(
        [] as ImarketCodes[]
      );
    
      const fetchMarketCodes = useCallback(async () => {
        const response = await fetch(REST_API_URL, options);
        const result: ImarketCodes[] = await response.json();
    
        setMarketCodes(result);
        setIsLoading(false);
      }, []);
    
      useEffect(() => {
        fetchMarketCodes();
      }, []);
    
      return { isLoading, marketCodes };
    }
