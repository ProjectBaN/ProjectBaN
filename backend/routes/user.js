const express = require("express");
const { getUserInfo, updateId } = require("../controller/user");
const { verifyAccessToken } = require("../module/verify");

const router = express.Router();

router.get("/getuserinfo", verifyAccessToken, getUserInfo);
router.post("/updateuserid", verifyAccessToken, updateId);
module.exports = router;
