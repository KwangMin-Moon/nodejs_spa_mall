const express = require('express');
const app = express(); // express 서버 객체를 받아와서 app이라는 변수에 그 객체가 들어있다.
const port = 3000;

app.use((req, res, next) => {
  console.log('마 이게 기본이다!');
  next();
});

app.use((req, res, next) => {
  console.log('미들웨어가 구현됐나?'); // 미들웨어가 실행되는지 체크
  if (req.path === '/test') {
    res.send('테스트 주소로 왔구나!');
  } else {
    next();
  }
});
// next를 안쓰려면 res함수를 써야함, 예 res.send('미들웨어의 응답이에요')
// 요청을 받으면 항상 미들웨어를 거치는데 next를 만나면 다음에 있는 미들웨어로 넘어간다.
// 보통 next()로 넘기는데 라우터에 넘기기전에 조건에 맞는게 있을 때 쓸 수도 있다.
// 미들웨어에서 response객체를 가지고 응답해주면 next없어도 문제되지 않는다. 응답 없이 next가
// 호출 안되는 경우에만 문제가 생긴다.

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(port, '포트로 서버가 켜졌어요!');
});

// localhost 3000이랑 127.0.0.1이랑 똑같다 loofback 주소를 가리키는데 내 컴퓨터 주소이다.

// 미들웨어를 중간에 적어줘야 밑에 요청 응답 메소드 들이 영향을 받을 수 있다.
