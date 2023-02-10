const express = require("express");
const router = express.Router();
const {
  cardUserPaymentConfirm,
  cardPaymentConfirm,
  bankPaymentConfirm,
  bankPaymentWebHook,
} = require("../controller/pay");
const {
  checkCardPayment,
  checkBankPayment,
} = require("../module/payMiddleware");

/* 유저 */
// 카드 **제거예정
router.get("/checkusercardpayment", checkCardPayment, cardUserPaymentConfirm);

// 카드
router.get("/checkcardpayment", checkCardPayment, cardPaymentConfirm);
// 가상계좌
router.get("/checkbankpayment", checkBankPayment, bankPaymentConfirm);
// 웹훅
router.post("/bankpaymentwebhook", bankPaymentWebHook);

module.exports = router;
