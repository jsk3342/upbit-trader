# 업비트 실시간 코인 시세 for web RFC

## 개요

코인 시장에서 발생하는 실시간 데이터를 연동하여 최신의 데이터를 제공합니다.

## 목표

### 주식 대시보드 개발

## 개발

### 핵심 목표

1. 실시간 데이터를 빠르게 제공합니다.
2. 사용자가 원하는 데이터를 가공하여 전달합니다.
3. 사용자에게 서비스의 매력을 증진시킵니다.

### 적정 기술

- 웹소켓을 활용하여 실시간 업데이트
- 더욱 더 많은 사용자가 서비스를 매력적으로 느낄 수 있게 업데이트 한다.
  - 빠른 속도
  - 미려한 디자인
  - 다양한 정보
  - 납득 가능한 UX
  - 사용자 니즈 파악

### 위험요소

### 검토 기술

- 실시간 통신을 위한 웹 소켓

### 솔루션

- NodeJS
- JavaScript
- React

## MetaData

### Timeline

- Reserch
- Develop
- Release

### Reference

**참고 사이트**
경쟁사 사이트 및 기능 조사

# 🚀 구현

### 진행 과정

## 파일 구성

```
📦src
 ┣ 📂apis
 ┃ ┣ 📂base
 ┃ ┃ ┣ 📜assets.js
 ┃ ┃ ┣ 📜info.js
 ┃ ┃ ┣ 📜rate.js
 ┃ ┃ ┗ 📜stockPrice.js
 ┃ ┗ 📂instance
 ┃ ┃ ┗ 📜index.js
 ┣ 📂components
 ┣ 📂constants
 ┃ ┣ 📜requests.js
 ┃ ┗ 📜url.js
 ┣ 📂container
 ┃ ┣ 📂marketPrice
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📜MarketControlButton.jsx
 ┃ ┃ ┃ ┣ 📜Stock.jsx
 ┃ ┃ ┃ ┗ 📜Stocks.jsx
 ┃ ┃ ┣ 📂contexts
 ┃ ┃ ┃ ┗ 📜MarketPriceContext.jsx
 ┃ ┃ ┣ 📂hooks
 ┃ ┃ ┃ ┗ 📜useSocketStock.js
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┗ 📜MarketPrice.jsx
 ┃ ┣ 📂marketStatusBar
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📜CompositeStockIndex.jsx
 ┃ ┃ ┃ ┗ 📜ExchangeRate.jsx
 ┃ ┃ ┣ 📂hooks
 ┃ ┃ ┃ ┣ 📜useSocketInfo.js
 ┃ ┃ ┃ ┗ 📜useSocketRate.js
 ┃ ┃ ┣ 📂utils
 ┃ ┃ ┃ ┣ 📜queueBuffers.js
 ┃ ┃ ┃ ┣ 📜sortBuffersInfo.js
 ┃ ┃ ┃ ┣ 📜squeezeBuffers.js
 ┃ ┃ ┃ ┗ 📜updateSocketData.js
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┗ 📜MarketStatusBar.jsx
 ┃ ┗ 📂portfolio
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📜MyStock.jsx
 ┃ ┃ ┃ ┣ 📜MyStocks.jsx
 ┃ ┃ ┃ ┣ 📜PortfolioButton.jsx
 ┃ ┃ ┃ ┗ 📜TotalAmount.jsx
 ┃ ┃ ┣ 📂hooks
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┗ 📜Portfolio.jsx
 ┣ 📂hooks
 ┃ ┗ 📜useSocket.js
 ┃ ┣ 📂socket
 ┃ ┃ ┣ 📂data
 ┃ ┃ ┃ ┣ 📜createInfoInterval.js
 ┃ ┃ ┃ ┣ 📜createNewTradeInterval.js
 ┃ ┃ ┃ ┣ 📜createPriceInterval.js
 ┃ ┃ ┃ ┗ 📜createRateInterval.js
 ┃ ┃ ┗ 📜index.js
 ┃ ┣ 📜common.js
 ┃ ┗ 📜index.js
 ┣ 📂pages
 ┃ ┗ 📜StockBoard.jsx
 ┣ 📂queries
 ┃ ┣ 📜useGetAssets.js
 ┃ ┣ 📜useGetInfo.js
 ┃ ┣ 📜useGetMarketPrice.js
 ┃ ┣ 📜useGetRate.js
 ┃ ┣ 📜useGetStockPriceKR.js
 ┃ ┗ 📜useGetStockPriceUS.js
 ┣ 📂services
 ┣ 📂store
 ┃ ┗ 📜atom.js
 ┣ 📂utils
 ┃ ┣ 📜squeezeBuffers.js
 ┃ ┣ 📜updateBuffers.js
 ┃ ┗ 📜updateSocketData.js
 ┣ 📜App.js
 ┣ 📜index.css
 ┣ 📜index.js
 ┗ 📜MockSamples.js
```

## 핵심 과제

1. 실시간 데이터 가공
2. 다중 소켓 연동
3. 관심사 분리

### 어려웠던 점

1. 소켓 통신
2. 통신 후 데이터 처리
3. 다른 곳에서 소켓 연결하면 에러나옴

처음 소켓 연동을 경험하여 생각 없이 상단바까지는커버 되었지만 주식 연결하니 리렌더링 할 컴포넌트들이 많아지면서 터져버렸습니다. 그리하여 단일 데이터는 큐로 구현하고 주식 리스트 같이 소켓과 버퍼를 useRef에 담아 관리 최적화 하였습니다.

- fetch는 빨랐지만 소켓 연동 데이터가 늦게 와서 중간 데이터 끊김 처리를 내부 isLoading 값으로 구현하였으며 서스펜스 함께 사용하여 이중으로 처리하였습니다.
- useRef로 소켓 담아서 최적화 진행하였습니다.
- buffer를 구현하여 서버 전송 주기에 따라 옵션을 주고 의도적으로 쓰로틀을 걸어 데이터 가공 후 전달하였습니다.
- 프로토콜에 어떤 데이터 타입인지 명시하여 명확함에 힘썼습니다.
- 상태가 변화면서 계속 소켓을 호출하는데 그 때 값이 없어서 열리자마자 바로 종료됨
- 1005 코드로 서버가 자꾸 종료되었습니다 - 사이드 이펙트로 컴포넌트 마운트 - 언마운트 될 때 send 중복과 소켓이 바로 닫혀서 난 오류였습니다.

## 회고 및 리팩토링

1. 소켓 open send 로직은 동일하기 때문에 공통 hook으로 구현하기. 데이터를 외부에서 주입하여 나오는 데이터 모아서 처리

데이터 주입
headless로 구현하기
각 상태별 context로 구획화 진행

만약 소켓 통신이 끊기면 다시 API를 pulling 하고 소켓 연동 try 시도
