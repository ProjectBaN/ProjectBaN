const { logger } = require("../config/logger");
const { checkReqBodyData } = require("../module/check");
const { createError } = require("../module/error");
const { awaitSql, checkSql } = require("../module/sqlPromise");
const maria = require("../database/maria");

const createReview = async (req, res, next) => {
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
  const starLating = req.body.data.starLating;
  const user = req.body.user;
  const title = req.body.data.title;
  const contents = req.body.data.contents;

  // 주문상품의 정보를 가져온다.

  const getOrderProductInfoQuery = `select * from t_user_order_product as op join t_product as p on op.t_product_num = p.t_product_num where op.t_users_order_product_num='${orderProductNum}'`;
  const getOrderProductInfo = await awaitSql(getOrderProductInfoQuery)
    .catch((err) => {
      logger.error(
        "😡 getOrderProductInfoQuery 중 SQL오류가 났어! -> " + err.message
      );
      return { err: err };
    })
    .then((result) => {
      return result;
    });
  if (!checkSql(getOrderProductInfo)) {
    logger.warn("😵‍💫 getOrderProductInfoQuery SQL에러 또는 변화된것이 없어!");
    return next(createError(501, "변화에 문제가 생겼습니다."));
  }

  if (getOrderProductInfo.length === 0) {
    logger.warn("😵‍💫 getOrderProductInfoQuery 값이 없어!");
    return next(createError(501, "리뷰 할려는 물품이 없습니다."));
  }

  // 트랜잭션 처리
  maria.beginTransaction(async (err) => {
    if (err) {
      maria.rollback();
      logger.error("😡  createOrder 트랜젝션중 오류가 났어!");
    }

    // 리뷰생성
    const createReviewQuery = `insert into t_product_review(t_order_product_num, t_product_write_num, t_product_num, users_id, t_product_review_starlating, t_product_review_title, t_product_review_contents) values ('${orderProductNum}','${getOrderProductInfo[0].t_product_write_num}','${getOrderProductInfo[0].t_product_num}', '${user}', '${starLating}', '${title}', '${contents}')`;
    const createReview = await awaitSql(createReviewQuery)
      .catch((err) => {
        logger.error(
          "😡 createReviewQuery 중 SQL오류가 났어! -> " + err.message
        );
        return { err: err };
      })
      .then((result) => {
        return result;
      });
    if (!checkSql(createReview)) {
      maria.rollback();
      logger.warn("😵‍💫 createReviewQuery SQL에러 또는 변화된것이 없어!");
      return next(createError(501, "변화에 문제가 생겼습니다."));
    }
    // 리뷰 이미지 업로드
    console.log();
    if (req.body.data.reviewImg) {
      const createReviewImgQuery = `insert into t_product_review_img(t_product_review_num,t_product_review_img_url) values ('${createReview.insertId}', '${req.body.data.reviewImg}')`;
      const sreateReviewImg = await awaitSql(createReviewImgQuery)
        .catch((err) => {
          logger.error(
            "😡 createReviewImgQuery 중 SQL오류가 났어! -> " + err.message
          );
          return { err: err };
        })
        .then((result) => {
          return result;
        });
      if (!checkSql(sreateReviewImg)) {
        maria.rollback();
        logger.warn("😵‍💫 createReviewImgQuery SQL에러 또는 변화된것이 없어!");
        return next(createError(501, "변화에 문제가 생겼습니다."));
      }
    }

    maria.commit();
    return res.send(successStatus({ massage: "리뷰성공" }));
  });
};

// 리뷰삭제
module.exports = {
  createReview,
};
