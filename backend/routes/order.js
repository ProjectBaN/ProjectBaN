const express = require("express");
const { createUserOrder } = require("../controller/order");
const { payTest } = require("../controller/pay");
const {
  orderCouponCheck,
  orderCouponCategoryCheck,
  totalCouponPrice,
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

module.exports = router;
