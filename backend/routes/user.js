const express = require("express");
const {
  getUserInfo,
  updateId,
  updatePassword,
  updateName,
  updateGender,
  updateEmail,
  updateAddr,
  updateAge,
  deleteUser,
} = require("../controller/user");
const { verifyAccessToken } = require("../module/verify");

const router = express.Router();

router.get("/getuserinfo", verifyAccessToken, getUserInfo);
router.post("/updateuserid", verifyAccessToken, updateId);
router.post("/updateuserpassword", verifyAccessToken, updatePassword);
router.post("/updateusername", verifyAccessToken, updateName);
router.post("/updateusergender", verifyAccessToken, updateGender);
router.post("/updateuseremail", verifyAccessToken, updateEmail);
router.post("/updateuseraddr", verifyAccessToken, updateAddr);
router.post("/updateuserage", verifyAccessToken, updateAge);
router.post("/updateuserdelete", verifyAccessToken, deleteUser);

module.exports = router;
