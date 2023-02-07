const express = require("express");
const { cardUserPaymentConfirm, canselPayment } = require("../controller/pay");
const { checkUserPayment } = require("../module/payMiddleware");
const router = express.Router();

router.get("/checkuserpayment", checkUserPayment, cardUserPaymentConfirm);

module.exports = router;
