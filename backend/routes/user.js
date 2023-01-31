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

// 로그인후 > 유저정보 가져오기
router.post("/getuserinfo", verifyAccessToken, getUserInfo);
// 로그인후 > id수정 삭제 논의
// router.post("/updateuserid", verifyAccessToken, updateId);

// 로그인후 > pw수정
router.post("/updateuserpassword", verifyAccessToken, updatePassword);
// 로그인후 > 이름 수정
router.post("/updateusername", verifyAccessToken, updateName);
//  로그인후 > 성별 수정
router.post("/updateusergender", verifyAccessToken, updateGender);
// 로그인후 > 이메일 수정
router.post("/updateuseremail", verifyAccessToken, updateEmail);
//  로그인후 > 주소 수정
router.post("/updateuseraddr", verifyAccessToken, updateAddr);
// 로그인후 > 나이수정
router.post("/updateuserage", verifyAccessToken, updateAge);
// 로그인후> 유저탈퇴
router.post("/deleteuser", verifyAccessToken, deleteUser);

module.exports = router;
