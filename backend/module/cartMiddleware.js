const { logger } = require("../config/logger");
const { checkReqBodyData } = require("./check");
const { createError } = require("./error");
const { awaitSql, checkSql } = require("./sqlPromise");
// 중복 장바구니 체크 미들웨어

const cartDuplicateCheck = async (req, res, next) => {
  if (!req.body.user) {
    logger.warn("😵‍💫 들어온 유저 데이터 값이 부족해...");
    return next(createError(400, "입력된 값이 없습니다."));
  }
  if (!checkReqBodyData(req, "productNum")) {
    logger.warn("😵‍💫 들어온 데이터 값이 부족해...");

    return next(createError(400, "입력된 값이 없습니다."));
  }
  const userId = req.body.user;
  const productNum = req.body.data.productNum;

  const getCartQuery = `select * from cart where t_users_id = '${userId}' and t_product_num='${productNum}'`;
  const getCart = await awaitSql(getCartQuery)
    .catch((err) => {
      logger.error("😡  장바구니를 찾는 중 SQL오류가 났어! -> " + err.message);
      return { err: err };
    })
    .then((result) => {
      return result;
    });

  if (!checkSql(getCart)) {
    logger.warn("😵‍💫 SQL에러 또는 변화된것이 없어!");

    return next(createError(403, "변화에 문제가 생겼습니다."));
  }
  if (getCart.length > 0) {
    return next(createError(403, "이미 장바구니에 있는 물품 입니다!"));
  } else {
    return next();
  }
};

module.exports = { cartDuplicateCheck };
