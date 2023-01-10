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
} = require("../controller/auth");
const {
  verifyForgetIdToken,
  verifyTemporarilyAccessToken,
} = require("../module/verify");
const router = express.Router();

router.post("/signup", signUp);
router.get("/signup/idcheck", idCheck);
router.post("/signin", signIn);
router.post("/forgetpasswordemail", forgetPasswordAuthEmail);
router.get(
  "/forgetpasswordauthcheckemail",
  verifyForgetIdToken,
  forgetPasswordAuthCheckEmail
);
router.post(
  "/temporarilyupdatepassword",
  verifyTemporarilyAccessToken,
  temporarilyUpdatePassword
);
router.post("/forgetidnamephone", forgetIdNamePhone);
router.post("/forgetidemail", forgetIdEmail);

module.exports = router;
