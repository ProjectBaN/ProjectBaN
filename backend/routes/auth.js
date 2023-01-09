const express = require("express");
const { signUp, signIn, idCheck } = require("../controller/auth");
const router = express.Router();

router.post("/signup", signUp);
router.get("/signup/idcheck", idCheck);
router.post("/signin", signIn);

module.exports = router;
