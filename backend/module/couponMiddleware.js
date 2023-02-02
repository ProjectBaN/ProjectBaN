const { logger } = require("../config/logger");
const { checkReqBodyData } = require("./check");
const { createError } = require("./error");
const { awaitSql, checkSql } = require("./sqlPromise");

// 쿠폰 유효기관 미들웨어
const couponValiedCheck = async (req, res, next) => {
  if (!checkReqBodyData(req, "couponNum")) {
    logger.warn("😵‍💫 들어온 데이터 값이 부족해...");

    return next(createError(400, "입력된 값이 없습니다."));
  }

  const couponNum = req.body.data.couponNum;

  const getCouponQuery = `select * from coupon where coupon_num = '${couponNum}'`;
  const getCoupon = await awaitSql(getCouponQuery)
    .catch((err) => {
      logger.error("😡  쿠폰을 찾는 중 SQL오류가 났어! -> " + err.message);

      return { err: err };
    })
    .then((result) => {
      return result;
    });

  if (!checkSql(getCoupon)) {
    logger.warn("😵‍💫 SQL에러 또는 변화된것이 없어!");

    return next(createError(403, "변화에 문제가 생겼습니다."));
  }
  if (getCoupon.length === 0) {
    logger.warn(`😵‍💫 발급가능한 쿠폰이 없어..`);
    return next(createError(403, "발급가능한 쿠폰이 없습니다."));
  }

  // 쿠폰 유표기간 확인
  const today = new Date();
  const couponValiedEnd = getCoupon[0].coupon_valied_end;
  if (today > couponValiedEnd) {
    logger.warn(`😵‍💫 발급기한이 지났어..`);

    return next(createError(403, "발급기한이 초과되었습니다!"));
  }
  req.body.couponResult = getCoupon;
  return next();
};

module.exports = { couponValiedCheck };
