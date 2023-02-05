const { logger } = require("../config/logger");
const { checkReqBodyData } = require("../module/check");
const { createError } = require("../module/error");
const { awaitSql, checkSql } = require("../module/sqlPromise");

const orderTest = async (req, res, next) => {
  return res.send("order");
};
//next 추가
// 사용가능한 쿠폰 갯수와 지금 장바구니 쿠폰 갯수 체크 -> 카테고리 쿠폰체크 -> 쿠폰들 사용 및 주문서 작성
const orderCouponCheck = async (req, res, next) => {
  if (!checkReqBodyData(req, "productList")) {
    logger.warn("😵‍💫 들어온 데이터 값이 부족해...");

    return next(createError(401, "값이없습니다."));
  }
  const productList = req.body.data.productList;
  if (!Array.isArray(productList) || productList.length === 0) {
    logger.warn("😵‍💫 잘못된 물품 리스트야...");
    return next(createError(401, "잘못된 리스트입니다."));
  }
  const result = {};

  for (const orderProduct of productList) {
    if (orderProduct.nomalCoupon) {
      result[orderProduct.nomalCoupon.couponNum] =
        (result[orderProduct.nomalCoupon.couponNum] || 0) + 1;
    }
    if (orderProduct.dualCoupon) {
      result[orderProduct.dualCoupon.couponNum] =
        (result[orderProduct.dualCoupon.couponNum] || 0) + 1;
    }
  }

  for (const key in result) {
    const getUserCouponCountQuery = `select * from coupon_users where coupon_num = ${key} and coupon_status='N'`;
    const getUserCouponCount = await awaitSql(getUserCouponCountQuery)
      .catch((err) => {
        logger.error("😡 쿠폰갯수를 얻는 중 SQL오류가 났어! -> " + err.message);
        return { err: err };
      })
      .then((result) => {
        return result;
      });

    if (!checkSql(getUserCouponCount)) {
      logger.warn("😵‍💫쿠폰갯수 SQL에러 또는 변화된것이 없어!");
      return next(createError(403, "변화에 문제가 생겼습니다."));
    }
    if (getUserCouponCount.length === 0) {
      return next(createError(403, "사용가능한 쿠폰이 없습니다."));
    }
    if (getUserCouponCount.length < result[key]) {
      return next(createError(403, key + "사용할려는 쿠폰이 더 많습니다."));
    }
  }
  return res.send("hello");
};

const checkCouponCategoryCheck = async (req, res, next) => {
  if (!checkReqBodyData(req, "productList")) {
    logger.warn("😵‍💫 들어온 데이터 값이 부족해...");
    return next(createError(401, "값이없습니다."));
  }

  //쿠폰 num coupon정보들고오고 그거 for 돌리고 coupon category 면 비교 -> 물품의 sale카테고리를 들고오고 coupon 카테고리를 비교 아니면 아웃

  return res.send("체크 쿠폰");
};

// 주문서 작성내용 [주문 물품 들]

// 주문물품들 해체 -> 주문물품의 가격을 산정

module.exports = { orderTest, orderCouponCheck, checkCouponCategoryCheck };
