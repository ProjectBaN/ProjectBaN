const { logger } = require("../config/logger");
const { checkReqBodyData } = require("./check");
const { createError } = require("./error");
const { awaitSql, checkSql } = require("./sqlPromise");

const checkAbleReview = async (req, res, next) => {
  if (
    !checkReqBodyData(req, "orderProductNum", "starLating", "title", "contents")
  ) {
    logger.warn("😵‍💫 들어온 데이터 값이 부족해...");
    return next(createError(401, "들어온 값이 부족합니다."));
  }

  if (!req.body.user) {
    logger.warn("😵‍💫 들어온 유저 데이터 값이 부족해...");
    return next(createError(401, "유저 값이없습니다."));
  }
  if (req.body.data.starLating < 0 || req.body.data.starLating > 5) {
    logger.warn("😵‍💫 잘못된 평점 점수가 들어왔어...");
    return next(createError(401, "잘못된 평점입니다."));
  }

  const orderProductNum = req.body.data.orderProductNum;
  const user = req.body.user;

  // 상품이 배송완료 인지 체크
  const getUserOrderQuery = `select * from t_order_product as op join t_order as o on op.t_order_uuid = o.t_order_uuid join t_order_product_user as opu on op.t_order_product_num = opu.t_order_product_num  where op.t_order_product_num='${orderProductNum}'`;
  const getUserOrder = await awaitSql(getUserOrderQuery)
    .catch((err) => {
      logger.error("😡 getUserOrderQuery 중 SQL오류가 났어! -> " + err.message);
      return { err: err };
    })
    .then((result) => {
      return result;
    });
  if (!checkSql(getUserOrder)) {
    logger.warn("😵‍💫 getUserOrderQuery SQL에러 또는 변화된것이 없어!");
    return next(createError(501, "변화에 문제가 생겼습니다."));
  }

  if (getUserOrder.length === 0) {
    logger.warn("😵‍💫 getUserOrderQuery 값이 없어!");
    return next(createError(501, "리뷰 할려는 물품이 없습니다."));
  }

  if (getUserOrder[0].t_users_id !== user) {
    logger.warn(
      `😵‍💫 ${user}가 다른 주문인  ${getUserOrder[0].t_users_id}의 리뷰를 작성할려고해!`
    );
    return next(createError(501, "다른 유저의 주문입니다."));
  }

  if (getUserOrder[0].t_order_status !== "배송완료") {
    logger.warn(`😵‍💫 현재 상품이 배송이 완료되지않은거같아!`);
    return next(createError(501, "배송완료되지않았거나 취소된 주문입니다."));
  }
  // 리뷰를 쓴적이 있는지도 체크
  const getUserReviewQuery = `select * from t_product_review where t_order_product_num = '${orderProductNum}' and users_id='${user}' `;
  const getUserReview = await awaitSql(getUserReviewQuery)
    .catch((err) => {
      logger.error(
        "😡 getUserReviewQuery 중 SQL오류가 났어! -> " + err.message
      );
      return { err: err };
    })
    .then((result) => {
      return result;
    });
  if (!checkSql(getUserReview)) {
    logger.warn("😵‍💫 getUserReviewQuery SQL에러 또는 변화된것이 없어!");
    return next(createError(501, "변화에 문제가 생겼습니다."));
  }

  if (getUserReview.length !== 0) {
    logger.warn(`😵‍💫 ${user}는 이 주문에 대해 리뷰를 쓴적이있어`);
    return next(createError(501, "리뷰를 한적있습니다."));
  }

  return next();
};

module.exports = {
  checkAbleReview,
};
