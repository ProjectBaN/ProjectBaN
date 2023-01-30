const express = require("express");
const {
  createCart,
  readCart,
  updateCart,
  deleteCart,
} = require("../controller/cart");
const { cartDuplicateCheck } = require("../module/cartMiddleware");
const { checkProductStock } = require("../module/productMiddleware");
const { verifyAccessToken } = require("../module/verify");

const router = express.Router();

router.post(
  "/createcart",
  verifyAccessToken,
  cartDuplicateCheck,
  checkProductStock,
  createCart
);
router.post("/readcart", verifyAccessToken, readCart);
router.post("/updatecart", verifyAccessToken, checkProductStock, updateCart);
router.post("/deletecart", verifyAccessToken, deleteCart);

module.exports = router;
