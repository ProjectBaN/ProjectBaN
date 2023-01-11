const express = require("express");
const {
  getUserInfo,
  updateId,
  udatePassword,
  udateName,
  udateGender,
  udateEmail,
  udateAddr,
  udateAge,
} = require("../controller/user");
const { verifyAccessToken } = require("../module/verify");

const router = express.Router();

router.get("/getuserinfo", verifyAccessToken, getUserInfo);
router.post("/updateuserid", verifyAccessToken, updateId);
router.post("/updateuserpassword", verifyAccessToken, udatePassword);
router.post("/updateusername", verifyAccessToken, udateName);
router.post("/updateusergender", verifyAccessToken, udateGender);
router.post("/updateuseremail", verifyAccessToken, udateEmail);
router.post("/updateuseraddr", verifyAccessToken, udateAddr);
router.post("/updateuserage", verifyAccessToken, udateAge);

module.exports = router;
