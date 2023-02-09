const express = require("express");
const { createReview } = require("../controller/review");
const { checkAbleReview } = require("../module/reviewMiddleware");
const { verifyAccessToken } = require("../module/verify");
const router = express.Router();

router.post("/createreview", verifyAccessToken, checkAbleReview, createReview);

module.exports = router;
