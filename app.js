const express = require('express');
const connect = require('./schemas'); // index 파일이름은 생략 가능하다. 몽구스를 쓰기 위해 볼러온 작업
const app = express(); // express 서버 객체를 받아와서 app이라는 변수에 그 객체가 들어있다.
const port = 3000;
const goodsRouter = require('./routes/goods.js');
const cartsRouter = require('./routes/carts.js');

connect();

// app.use((req, res, next) => {
//   console.log('Request URL:', req.originalUrl, ' - ', new Date());
//   next();
// });

// 위에 꺼를 아래와 같이 간단히 정리할 수 있다.

const requestMiddleware = (req, res, next) => {
  console.log('Request URL:', req.originalUrl, ' - ', new Date()); //req.originalUrl 클라이언트가 적은 url반환
  next();
};

app.use(express.static('static'));
app.use(express.json()); // body로 들어오는 json 형태의 데이터를 파싱해준다.
app.use(requestMiddleware);

app.use('/api', [goodsRouter, cartsRouter]);

// 여러개 일때는 app.use('/api', [goodsRouter, cartsRouter]); 이런식으로 해줄 수 있다.

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(port, '포트로 서버가 켜졌어요!');
});

// localhost 3000이랑 127.0.0.1이랑 똑같다 loofback 주소를 가리키는데 내 컴퓨터 주소이다.

// 미들웨어를 중간에 적어줘야 밑에 요청 응답 메소드 들이 영향을 받을 수 있다.
