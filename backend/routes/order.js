const express = require("express");
const {
  createUserOrder,
  cancelUserOrder,
  createOrder,
  cancelOrder,
  cancelUserProduct,
  cancelProduct,
} = require("../controller/order");
const {
  orderCouponCheck,
  orderCouponCategoryCheck,
  totalCouponPrice,
  orderPriceCheck,
} = require("../module/ordderMiddleware");
const { verifyAccessToken } = require("../module/verify");
const router = express.Router();

/* 회원 주문 */
// 유저주문생성
router.post(
  "/createuserorder",
  verifyAccessToken,
  orderCouponCheck,
  orderCouponCategoryCheck,
  totalCouponPrice,
  createUserOrder
);

// 부분 취소(물품마다 취소를 해야되니)
router.post("/canceluserproduct", verifyAccessToken, cancelUserProduct);

// 전체 취소 * 회의 후 프로젝트 문서에 추가
router.post("/canceluserorder", verifyAccessToken, cancelUserOrder);

/* 비회원 주문 */
// 주문생성
router.post("/createorder", orderPriceCheck, createOrder);
// 주문 전체취소 * 회의 후 수정하여 프로젝트 문서에 추가
router.post("/cancelorder", cancelOrder);
// 주문 부분취소-> 기본
router.post("/cancelproduct", cancelProduct);
module.exports = router;
