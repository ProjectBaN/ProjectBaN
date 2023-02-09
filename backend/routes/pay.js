const express = require("express");
const router = express.Router();
const {
  cardUserPaymentConfirm,
  cardPaymentConfirm,
  bankUserPaymentConfirm,
  bankPaymentConfirm,
} = require("../controller/pay");
const { checkUserPayment, checkPayment } = require("../module/payMiddleware");

/* 유저 */
// 카드
router.get("/checkusercardpayment", checkUserPayment, cardUserPaymentConfirm);
// 가상계좌
router.get("/checkuserbankpayment", checkUserPayment, bankUserPaymentConfirm);

/* 비회원 */
// 카드
router.get("/checkcardpayment", checkPayment, cardPaymentConfirm);
// 가상계좌
router.get("/checkbankpayment", checkPayment, bankPaymentConfirm);

module.exports = router;
