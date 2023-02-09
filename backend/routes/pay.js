const express = require("express");
const router = express.Router();
const {
  cardUserPaymentConfirm,
  canselPayment,
  cardPaymentConfirm,
} = require("../controller/pay");
const { checkUserPayment, checkPayment } = require("../module/payMiddleware");

// 유저
router.get("/checkusercardpayment", checkUserPayment, cardUserPaymentConfirm);
// 비회원
router.get("/checkcardpayment", checkPayment, cardPaymentConfirm);

module.exports = router;
