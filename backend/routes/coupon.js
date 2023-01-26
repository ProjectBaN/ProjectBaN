const express = require("express");

const {
  createCouponCategory,
  readCouponCategory,
  updateCouponCategory,
  deleteCouponCategory,
  readCouponCategoryProduct,
  createConponCategoryProduct,
  deleteCouponCategoryProduct,
} = require("../controller/coupon");

const router = express.Router();

router.post("/createcouponcategory", createCouponCategory);
router.get("/readcouponcategory", readCouponCategory);
router.post("/updatecouponcategory", updateCouponCategory);
router.post("/deletecouponcategory", deleteCouponCategory);
router.post("/createconponcategoryproduct", createConponCategoryProduct);
router.post("/readcouponcategoryproduct", readCouponCategoryProduct);
router.post("/deletecouponcategoryproduct", deleteCouponCategoryProduct);

module.exports = router;
