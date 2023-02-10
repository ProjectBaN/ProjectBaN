const express = require("express");
const router = express.Router();
const {
  cardUserPaymentConfirm,
  cardPaymentConfirm,
  bankUserPaymentConfirm,
  bankPaymentConfirm,
  bankPaymentWebHook,
} = require("../controller/pay");
const { checkUserPayment, checkPayment } = require("../module/payMiddleware");

/* 유저 */
// 카드
router.get("/checkusercardpayment", checkUserPayment, cardUserPaymentConfirm);

// 카드
router.get("/checkcardpayment", checkPayment, cardPaymentConfirm);
// 가상계좌
router.get("/checkbankpayment", checkPayment, bankPaymentConfirm);
router.post("/bankpaymentwebhook", bankPaymentWebHook);

module.exports = router;
