const express = require("express");
const { verifyAccessToken, verifyForgetIdToken } = require("../module/verify");

const router = express.Router();

router.get("/", verifyAccessToken, (req, res) => {
  return res.send("hello world!");
});

module.exports = router;
