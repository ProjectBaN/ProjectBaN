const express = require("express");
const {
  createCart,
  readCart,
  updateCart,
  deleteCart,
} = require("../controller/cart");
const { cartDuplicateCheck } = require("../module/cartMiddleware");
const { checkProductStock } = require("../module/productMiddleware");
const { verifyAccessToken } = require("../module/verify");

const router = express.Router();
// 로그인확인 > 장바구니중복확인> 상품재고확인> 장바구니생성
router.post(
  "/createcart",
  verifyAccessToken,
  cartDuplicateCheck,
  checkProductStock,
  createCart
);
// 로그인확인 > 유저장바구니불러오기
router.post("/readcart", verifyAccessToken, readCart);
// 로그인 > 상품재고확인> 장바구니수정
router.post("/updatecart", verifyAccessToken, checkProductStock, updateCart);
// 로그인확인 > 장바구니 삭제
router.post("/deletecart", verifyAccessToken, deleteCart);

module.exports = router;
