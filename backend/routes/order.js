const express = require("express");
const { createUserOrder, cancelUserOrder } = require("../controller/order");
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

router.post("/canceluserorder", verifyAccessToken, cancelUserOrder);
module.exports = router;
