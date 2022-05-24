const mongoose = require('mongoose'); // 모듈을 가지고 온다.

// 스키마 생성
const goodsSchema = mongoose.Schema({
  goodsId: {
    // goodsId라는걸 입력받을 수 있게 한다.
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  thumbnailUrl: {
    type: String,
  },
  category: {
    type: String,
  },
  price: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//const model = mongoose.model('Goods', goodsSchema);
module.exports = mongoose.model('Goods', goodsSchema);
// 스키마를 밖에서 써주기 위해
// 모델 이름은 뭐냐? Goods다
// 스키마가 뭔데 했을 때 goodsSchema 이렇게 변수를 참조하면 된다.
// 그럼 이 모델을 밖에서 재활용, 계속 재사용할 수 있게 된거다.
// 여기 모델 이름 Goods가 몽고DB 데이터베이스 spa_mall -> collentions -> goods 이걸 말한다.
