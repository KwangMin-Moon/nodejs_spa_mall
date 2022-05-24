const express = require('express');
const Goods = require('../schemas/goods'); // ../(상대경로)(내 위치보더 더 위)routes의 good.js를 기준으로 하면
// 위로 가면 app.js파일이 있는 위치// shema에서 내보는 모델을 참조한거다. 모델을 더 쉽게 파악하려고 대문자를 씀
const Cart = require('../schemas/cart');
const router = express.Router(); // 익스프레스가 제공하는 라우터를 사용할 수 있게 됐다.
// router라는 객체를 생성한것이다.

router.get('/', (req, res) => {
  res.send('this is root page');
});

// const goods = [
//   {
//     goodsId: 4,
//     name: '상품 4',
//     thumbnailUrl:
//       'https://cdn.pixabay.com/photo/2016/09/07/02/11/frogs-1650657_1280.jpg',
//     category: 'drink',
//     price: 0.1,
//   },
//   {
//     goodsId: 3,
//     name: '상품 3',
//     thumbnailUrl:
//       'https://cdn.pixabay.com/photo/2016/09/07/02/12/frogs-1650658_1280.jpg',
//     category: 'drink',
//     price: 2.2,
//   },
//   {
//     goodsId: 2,
//     name: '상품 2',
//     thumbnailUrl:
//       'https://cdn.pixabay.com/photo/2014/08/26/19/19/wine-428316_1280.jpg',
//     category: 'drink',
//     price: 0.11,
//   },
//   {
//     goodsId: 1,
//     name: '상품 1',
//     thumbnailUrl:
//       'https://cdn.pixabay.com/photo/2016/09/07/19/54/wines-1652455_1280.jpg',
//     category: 'drink',
//     price: 6.2,
//   },
// ];

// 상품전체목록 api
// router.get('/goods', (req, res) => {
//   res.json({ goods }); // goods라는 키에 배열값을 넣은거다. 객체 초기화에 의해 키와 밸류의
//   // 이름이 같다면 생략할 수 있다.
// });

// 데이터베이스에서 가져오기
// router.get('/goods', async (req, res) => {
//   const goods = await Goods.find();
//   const sortedGoods = goods.sort((a, b) => b['date'] - a['date']);

//   res.json(sortedGoods);
// });

// 쿼리 스트링으로 값을 받아오기
router.get('/goods', async (req, res) => {
  const { category } = req.query;
  const goods = category ? await Goods.find({ category }) : await Goods.find();
  res.json(goods);
});

// 상품id별로 목록 조회 api
// : 뒤에 무언가 있으면 아무 값이나 입력 받겠다이다. 즉 /goods/: 아무 값(goodsId) 이 아무 값의 별명이 goodsId로 부르겠다 이다.
// router.get('/goods/:goodsId', (req, res) => {
//   const goodsId = req.params.goodsId; // goodsId는 문자열이다 그렇기 때문에 아래에 필터할 숫자형으로 안바꿔주면 아무것도 안나온다.
//   const [detail] = goods.filter((item) => item.goodsId === Number(goodsId));
//   console.log(detail);
//   res.json({ detail }); // 데이터를 배열이 아닌 객처로 보내줘야 하니까 [0] 이렇게 해주면 되고 혹은 디스트럭팅을 해주면 된다.
// });

// 데이터 베이스에서 상세조회
router.get('/goods/:goodsId', async (req, res) => {
  const { goodsId } = req.params;
  const [goods] = await Goods.find({ goodsId: Number(goodsId) });
  console.log(goods);
  res.json({ goods });
});

router.post('/goods', async (req, res) => {
  const { goodsId, name, thumbnailUrl, category, price } = req.body;
  const goods = await Goods.find({ goodsId }); // 데이터를 조건에 맞는 데이터가 있는지 찾아서 변수에 넣어 주는 작업
  // Goods뒤에 find라는 함수는 프로미스를 반환한다. 그러므로 async await 사용 그럼 배열로 넘어온다, 여기서 Goods는 스키마의 모델명
  // 현재는 데이터 베이스에 아무것도 없기 때문에 req를 요청해도 응답할 수 있는 데이터가 없다.
  // 아래가 데이터가 없을 때 넣어주는 작업
  if (goods.length) {
    return res.status(400).json({
      success: false,
      errorMessage: '이미 있는 데이터입니다.',
    }); // return을 해준 이유는 밑에 있는 코드가 또 읽혀질 수 있다. 리턴해도 아무 문제가 없는 상황이라면 리턴을 해주는 게 좋다.
  }
  // create는 모델을 생성하면서 insert까지 해주는 함수라고 보면 된다.
  const createdGoods = await Goods.create({
    goodsId,
    name,
    thumbnailUrl,
    category,
    price,
  }); // 데이터베이스에 넣는 작업
  // await을 안해주면 create 작업이 끝나지 않았는 데 응답이 나가버린다.
  res.json({ goods: createdGoods });
});

// 장바구니에 추가하는 API
router.post('/goods/:goodsId/cart', async (req, res) => {
  const { goodsId } = req.params;
  const { quantity } = req.body;
  const existsCarts = await Cart.find({ goodsId: Number(goodsId) });
  if (existsCarts.length) {
    return res.status(400).json({
      success: false,
      errorMessage: '이미 장바구니에 들어있는 상품입니다.',
    });
  }
  await Cart.create({
    goodsId: Number(goodsId),
    quantity,
  });
  res.json({ success: true });
});

router.delete('/goods/:goodsId/cart', async (req, res) => {
  const { goodsId } = req.params;
  const existsCarts = await Cart.find({ goodsId: Number(goodsId) });
  if (existsCarts.length) {
    await Cart.deleteOne({ goodsId: Number(goodsId) });
  }
  res.json({ success: true });
});

router.put('/goods/:goodsId/cart', async (req, res) => {
  const { goodsId } = req.params;
  const { quantity } = req.body;
  const existsCarts = await Cart.find({ goodsId: Number(goodsId) });
  if (!existsCarts.length) {
    return res.status(400).json({
      seccess: false,
      errorMessage: '장바구니에 해당 상품이 없습니다.',
    });
  }
  await Cart.updateOne({ goodsId: Number(goodsId) }, { $set: { quantity } });
  res.json({ success: true });
});

// POST, PUT, DELETE 이런 여러가지 GET을 제외한 다른 메서드들은 body라는 데이터를 받아 올 수 있다.
// 페이로드, 바디 둘 다 같은 뜻

module.exports = router;

// res.json() 응답으로 json형태의 데이터를 주겠다.
// router.get('/books', (req, res) => {
//   res.json({ success: true, data: getAllBooks() });
// });
// books라는 Resource들에 대해서 얻겠다 조회하겠다 그리고 json형태의 데이터로 주겠다(표현하겠다)
