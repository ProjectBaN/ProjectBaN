const express = require("express");
const { signUp, sign } = require("../controller/auth");
const router = express.Router();

router.post("/", signUp);
router.get("/test", sign);

module.exports = router;
