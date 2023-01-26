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

router.post("/signup", signUp);

module.exports = router;
