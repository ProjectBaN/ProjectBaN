const express = require("express");
const {
  signUp,
  signIn,
  idCheck,
  forgetIdAuthEmail,
  forgetIdAuthCheckEmail,
} = require("../controller/auth");
const { verifyForgetIdToken } = require("../module/verify");
const router = express.Router();

router.post("/signup", signUp);
router.get("/signup/idcheck", idCheck);
router.post("/signin", signIn);
router.post("/forgetidEmail", forgetIdAuthEmail);
router.get("/forgetidEmailCheck", verifyForgetIdToken, forgetIdAuthCheckEmail);

module.exports = router;
