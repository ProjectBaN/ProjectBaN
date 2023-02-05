const express = require("express");
const {
  orderTest,
  orderCouponCheck,
  checkCouponCategoryCheck,
} = require("../controller/order");
const { payTest } = require("../controller/pay");
const router = express.Router();

router.get("/ordertest", orderTest);
router.post("/ordercouponcheck", orderCouponCheck);
router.post("/checkcouponcategorycheck", checkCouponCategoryCheck);

module.exports = router;
