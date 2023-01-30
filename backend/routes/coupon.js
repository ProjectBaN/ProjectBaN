const express = require("express");

const {
  createCouponCategory,
  readCouponCategory,
  updateCouponCategory,
  deleteCouponCategory,
  readCouponCategoryProduct,
  createConponCategoryProduct,
  deleteCouponCategoryProduct,
  createCoupon,
  readCoupon,
  updateCoupon,
  deleteCoupon,
  createUserCoupons,
  useAbleCoupons,
  readUserCoupons,
  deleteUserConpons,
} = require("../controller/coupon");
const { couponValiedCheck } = require("../module/couponMiddleware");
const { verifyAccessToken } = require("../module/verify");

const router = express.Router();
// 세일카테고리 생성
router.post("/createcouponcategory", createCouponCategory);
// 세일카테고리 조회
router.get("/readcouponcategory", readCouponCategory);
// 세일카테고리 수정
router.post("/updatecouponcategory", updateCouponCategory);
// 세일카테고리 삭제
router.post("/deletecouponcategory", deleteCouponCategory);
// 세일카테고리에 상품추가
router.post("/createconponcategoryproduct", createConponCategoryProduct);
// 세일카테고리에 상품불러오기
router.post("/readcouponcategoryproduct", readCouponCategoryProduct);
// 세일카테고리안 상품 삭제
router.post("/deletecouponcategoryproduct", deleteCouponCategoryProduct);
// 쿠폰생성
router.post("/createcoupon", createCoupon);
// 쿠폰읽어오기
router.get("/readcoupon", readCoupon);
// 쿠폰업데이트
router.post("/updatecoupon", updateCoupon);
// 쿠폰딜리트
router.post("/deletecoupon", deleteCoupon);
// 로그인>유효쿠폰확인>유저쿠폰발급
router.post(
  "/createusercoupons",
  verifyAccessToken,
  // deleteUserConpons,
  couponValiedCheck,
  createUserCoupons
);
//로그인> 유저가 사용가능한 쿠폰 가져오기
router.post("/useablecoupons", verifyAccessToken, useAbleCoupons);
// 로그인> 유저가 가진 쿠폰 가져오기
router.post("/readusercoupons", verifyAccessToken, readUserCoupons);
// 유저정보 필요 만료된 쿠폰 삭제 next or return으로 처리할지 정하기;
// 로그인후> 유저의 쿠폰 삭제
router.post("/deleteusercoupons", verifyAccessToken, deleteUserConpons);

module.exports = router;
