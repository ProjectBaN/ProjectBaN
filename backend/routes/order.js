const express = require("express");
const { createOrder } = require("../controller/order");
const { payTest } = require("../controller/pay");
const {
  orderCouponCheck,
  orderCouponCategoryCheck,
  totalCouponPrice,
} = require("../module/ordderMiddleware");
const { verifyAccessToken } = require("../module/verify");
const router = express.Router();

router.post(
  "/createorder",
  verifyAccessToken,
  orderCouponCheck,
  orderCouponCategoryCheck,
  totalCouponPrice,
  createOrder
);

module.exports = router;
