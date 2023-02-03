const express = require("express");
const { payTest } = require("../controller/pay");
const router = express.Router();

router.get("/paytest", payTest);

module.exports = router;
