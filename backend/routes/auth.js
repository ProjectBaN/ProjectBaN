const express = require("express");
const { signUp, signIn, idCheck, forgetIdAuth } = require("../controller/auth");
const { verifyForgetIdToken } = require("../module/verify");
const router = express.Router();

router.post("/signup", signUp);
router.get("/signup/idcheck", idCheck);
router.post("/signin", signIn);
router.post("/forgetidemail", forgetIdAuth);
router.get("/idcheck", verifyForgetIdToken, (req, res) => {
  console.log(req.email);
  return res.send("성공");
});

module.exports = router;
