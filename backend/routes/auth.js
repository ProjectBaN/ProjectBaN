const express = require("express");
const {
  signUp,
  signIn,
  idCheck,
  forgetPasswordAuthEmail,
  temporarilyUpdatePassword,
  forgetPasswordAuthCheckEmail,
  forgetIdNamePhone,
  forgetIdEmail,
  signOut,
  emailCheck,
  phoneCheck,
} = require("../controller/auth");
const {
  verifyForgetIdToken,
  verifyTemporarilyAccessToken,
} = require("../module/verify");
const router = express.Router();
// 회원가입
router.post("/signup", signUp);
// id중복체크
router.get("/signup/idcheck", idCheck);
// 이메일중복체크
router.get("/signup/emailcheck", emailCheck);
// 휴대폰 중복 체크
router.get("/signup/phonecheck", phoneCheck);
// 로그인
router.post("/signin", signIn);
// 비밀번호찾기 이메일 발송
router.post("/forgetpasswordemail", forgetPasswordAuthEmail);
// 이메일 암호 확인 > 비밀번호 변경 가능 토큰 발급
router.get(
  "/forgetpasswordauthcheckemail",
  verifyForgetIdToken,
  forgetPasswordAuthCheckEmail
);
//  임시엑세스토큰 확인 > 비밀번호변경
router.post(
  "/temporarilyupdatepassword",
  verifyTemporarilyAccessToken,
  temporarilyUpdatePassword
);
// 아이디 찾기 : 이름,폰
router.post("/forgetidnamephone", forgetIdNamePhone);
// 아이디찾기 : 이메일
router.post("/forgetidemail", forgetIdEmail);
// 로그아웃
router.post("/signout", signOut);
module.exports = router;
