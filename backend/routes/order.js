const express = require("express");
const {
  createUserOrder,
  cancelUserOrder,
  createOrder,
  cancelOrder,
  cancelUserProduct,
} = require("../controller/order");
const {
  orderCouponCheck,
  orderCouponCategoryCheck,
  totalCouponPrice,
  orderPriceCheck,
} = require("../module/ordderMiddleware");
const { verifyAccessToken } = require("../module/verify");
const router = express.Router();

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
// 전체 취소
router.post("/canceluserorder", verifyAccessToken, cancelUserOrder);

router.post("/createorder", orderPriceCheck, createOrder);
router.post("/cancelorder", cancelOrder);

module.exports = router;
