const express = require("express");
const { createProductWrite, hitsUp } = require("../controller/product");
const router = express.Router();

router.post("/create", createProductWrite);
router.get("/hitsup", hitsUp);
module.exports = router;
