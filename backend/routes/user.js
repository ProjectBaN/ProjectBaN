const express = require("express");
const {
  getUserInfo,
  updateId,
  temporarilyUpdatePassword,
} = require("../controller/user");
const {
  verifyAccessToken,
  verifyTemporarilyAccessToken,
} = require("../module/verify");

const router = express.Router();

router.get("/getuserinfo", verifyAccessToken, getUserInfo);
router.post("/updateuserid", verifyAccessToken, updateId);

module.exports = router;
