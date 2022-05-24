const express = require('express');
const cart = require('../schemas/cart');
const Carts = require('../schemas/cart');
const Goods = require('../schemas/goods');
const router = express.Router();

router.get('/carts', async (req, res) => {
  const carts = await Carts.find();
  const goodsIds = carts.map((cart) => cart.goodsId);
  const goods = await Goods.find({ goodsId: goodsIds }); // find의 {goodsId: goodsIds}에서 goodsIds 부분에 배열이 들어가도 되고 그냥 숫자 값이 들어가도 찾아지는데 배열이 들어가도 되는 구나

  res.json({
    carts: carts.map((cart) => {
      return {
        quantity: cart.quantity,
        goods: goods.find((item) => item.goodsId === cart.goodsId),
      };
    }),
  });
});

module.exports = router;
