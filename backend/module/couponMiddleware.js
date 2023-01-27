const { checkReqBodyData } = require("./check");
const { createError } = require("./error");
const { awaitSql, checkSql } = require("./sqlPromise");

const couponValiedCheck = async (req, res, next) => {
  if (!checkReqBodyData(req, "couponNum")) {
    return next(createError(400, "입력된 값이 없습니다."));
  }

  const couponNum = req.body.data.couponNum;

  const getCouponQuery = `select * from coupon where coupon_num = '${couponNum}'`;
  const getCoupon = await awaitSql(getCouponQuery)
    .catch((err) => {
      return { err: err };
    })
    .then((result) => {
      return result;
    });

  if (!checkSql(getCoupon)) {
    return next(createError(403, "변화에 문제가 생겼습니다."));
  }
  if (getCoupon.length === 0) {
    return next(createError(403, "발급가능한 쿠폰이 없습니다."));
  }

  // 쿠폰 유표기간 확인
  const today = new Date();
  const couponValiedEnd = getCoupon[0].coupon_valied_end;
  if (today > couponValiedEnd) {
    return next(createError(403, "발급기한이 초과되었습니다!"));
  }
  req.body.couponResult = getCoupon;
  return next();
};

module.exports = { couponValiedCheck };
