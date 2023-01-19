const express = require("express");
const { writeProduct } = require("../controller/product");
const router = express.Router();

router.get("/", writeProduct);

module.exports = router;
