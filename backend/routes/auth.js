const express = require("express");
const { signUp, signIn } = require("../controller/auth");
const router = express.Router();

router.post("/", signUp);
router.post("/test", signIn);

module.exports = router;
