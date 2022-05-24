const mongoose = require('mongoose'); //mongoose를 불러온는 작업

const connect = () => {
  // mongoose를 mongoDB와 연결하는 작업
  mongoose
    .connect('mongodb://localhost:27017/spa_mall', { ignoreUndefined: true }) // ignoreUndefinde를 true로 하는 이유는 몽고디비 find를 하면 어떻게든 값을 찾으려 하는데 undefinded로 넘어오는 값은 무시해줘라고 말하는 것이다.
    .catch((err) => {
      console.error(err);
    });
};

module.exports = connect;
// 이렇게 내 보내는 이유는 몽고DB와 관련된 코드는 대부분 schemas 폴더 안에 들어갈 건데 여기서
// 몽고DB 연결하는 코드도 내보내서 딴데서 사용할 거다. app.js에서 사용할 거다.
// const connect = require('./schemas'); 이렇게 가져와서 사용 가능하다. index.js는 생략함
// app.js에서 connect() 이렇게 실행할 수 있다.
// app.js를 노드로 실행할 건데 connect함수가 호출되면 index.js의 connect함수가 실행되면서 mongoose의
// connect 함수를 실행하는 거다.
// 서버를 켰는데 에러가 발생하지 않으면 잘 연결 된거다.
