const express = require("express");
const verifyToken = require("../module/verify");

const router = express.Router();

router.get("/", verifyToken, (req, res) => {
  return res.send("hello world!");
});

module.exports = router;
