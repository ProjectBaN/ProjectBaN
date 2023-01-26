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
  signOut,
  emailCheck,
  phoneCheck,
} = require("../controller/auth");
const {
  hellow,
  createCouponCategory,
  readCouponCategory,
  updateCouponCategory,
  deleteCouponCategory,
  readCouponCategoryProduct,
  createConponCategoryProduct,
  deleteCouponCategoryProduct,
} = require("../controller/coupon");
const {
  verifyForgetIdToken,
  verifyTemporarilyAccessToken,
} = require("../module/verify");
const router = express.Router();

router.post("/createcouponcategory", createCouponCategory);
router.get("/readcouponcategory", readCouponCategory);
router.post("/updatecouponcategory", updateCouponCategory);
router.post("/deletecouponcategory", deleteCouponCategory);
router.post("/createconponcategoryproduct", createConponCategoryProduct);
router.post("/readcouponcategoryproduct", readCouponCategoryProduct);
router.post("/deletecouponcategoryproduct", deleteCouponCategoryProduct);

module.exports = router;
