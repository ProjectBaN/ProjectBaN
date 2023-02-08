const express = require("express");
const {
  createUserOrder,
  cancelUserOrder,
  createOrder,
  cancelOrder,
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
router.post("/canceluserorder", verifyAccessToken, cancelUserOrder);

router.post("/createorder", orderPriceCheck, createOrder);
router.post("/cancelorder", cancelOrder);
module.exports = router;
