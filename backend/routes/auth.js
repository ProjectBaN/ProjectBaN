const express = require("express");
const {
  signUp,
  signIn,
  idCheck,
  forgetIdAuthCheckEmail,
  forgetPasswordAuthEmail,
  temporarilyUpdatePassword,
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
router.get("/forgetidEmailCheck", verifyForgetIdToken, forgetIdAuthCheckEmail);
router.post(
  "/temporarilyupdatepassword",
  verifyTemporarilyAccessToken,
  temporarilyUpdatePassword
);
module.exports = router;
