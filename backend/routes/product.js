const express = require("express");
const { createProductWrite } = require("../controller/product");
const router = express.Router();

router.post("/create", createProductWrite);

module.exports = router;
