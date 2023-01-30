const express = require("express");
const {
  createCart,
  readCart,
  updateCart,
  deleteCart,
} = require("../controller/cart");
const { cartDuplicateCheck } = require("../module/cartMiddleware");
const { verifyAccessToken } = require("../module/verify");

const router = express.Router();

router.post("/createcart", verifyAccessToken, cartDuplicateCheck, createCart);
router.post("/readcart", verifyAccessToken, readCart);
router.post("/updatecart", verifyAccessToken, updateCart);
router.post("/deletecart", verifyAccessToken, deleteCart);

module.exports = router;
