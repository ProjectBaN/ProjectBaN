const express = require("express");
const { orderTest, orderProductPrice } = require("../controller/order");
const { payTest } = require("../controller/pay");
const router = express.Router();

router.get("/ordertest", orderTest);
router.post("/orderproductprice", orderProductPrice);

module.exports = router;
