const { logger } = require("../config/logger");
const { checkReqBodyData } = require("../module/check");
const { createError } = require("../module/error");
const { awaitSql, checkSql } = require("../module/sqlPromise");
const { successStatus } = require("../module/statuscode");

// 장바구니추가
const createCart = async (req, res, next) => {
  if (!req.body.user) {
    logger.warn("유저 😵‍💫 들어온 데이터 값이 부족해...");
    return next(createError(400, "입력된 값이 없습니다."));
  }
  if (!checkReqBodyData(req, "productNum", "count")) {
    logger.warn("😵‍💫 들어온 데이터 값이 부족해...");

    return next(createError(400, "입력된 값이 없습니다."));
  }

  const userId = req.body.user;
  const productNum = req.body.data.productNum;
  const count = req.body.data.count;

  const createCartQuery = `insert into cart(t_users_id, t_product_num, count) values('${userId}', '${productNum}','${count}' )`;

  const createCart = await awaitSql(createCartQuery)
    .catch((err) => {
      logger.error("😡 장바구니 추가 중 SQL오류가 났어! -> " + err.message);
      return { err: err };
    })
    .then((result) => {
      return result;
    });

  if (!checkSql(createCart)) {
    logger.warn("😵‍💫 SQL에러 또는 변화된것이 없어!");
    return next(createError(403, "변화에 문제가 생겼습니다."));
  }

  return res.send(successStatus({ success: true }));
};

// 장바구니 가져오기
const readCart = async (req, res, next) => {
  if (!req.body.user) {
    logger.warn("유저 😵‍💫 들어온 데이터 값이 부족해...");
    return next(createError(400, "입력된 값이 없습니다."));
  }

  const userId = req.body.user;

  const getCartQuery = `select * from cart where t_users_id = '${userId}' `;
  const getCart = await awaitSql(getCartQuery)
    .catch((err) => {
      logger.error("😡 장바구니 가져오기 중 SQL오류가 났어! -> " + err.message);
      return { err: err };
    })
    .then((result) => {
      return result;
    });

  if (!checkSql(getCart)) {
    logger.warn("😵‍💫 SQL에러 또는 변화된것이 없어!");

    return next(createError(403, "변화에 문제가 생겼습니다."));
  }

  return res.send(successStatus(getCart));
};

// 장바구니 수량변경
const updateCart = async (req, res, next) => {
  if (!req.body.user) {
    logger.warn("유저 😵‍💫 들어온 데이터 값이 부족해...");

    return next(createError(403, "입력된 값이 없습니다."));
  }

  if (!checkReqBodyData(req, "productNum", "count")) {
    logger.warn("😵‍💫 들어온 데이터 값이 부족해...");

    return next(createError(400, "입력된 값이 없습니다."));
  }

  if (req.body.data.count <= 0) {
    logger.warn("😵‍💫 들어온 데이터 값이 부족해...");
    return next(createError(403, "입력된 값이 없습니다."));
  }

  const userId = req.body.user;
  const productNum = req.body.data.productNum;
  const count = req.body.data.count;

  const updateCartQuery = `update cart set count = '${count}' where t_users_id = '${userId}' and t_product_num ='${productNum}'`;

  const updateCart = await awaitSql(updateCartQuery)
    .catch((err) => {
      logger.error("😡 장바구니 수량변경 중 SQL오류가 났어! -> " + err.message);

      return { err: err };
    })
    .then((result) => {
      return result;
    });

  if (!checkSql(updateCart)) {
    logger.warn("😵‍💫 SQL에러 또는 변화된것이 없어!");

    return next(createError(403, "변화에 문제가 생겼습니다."));
  }

  return res.send(successStatus({ success: true }));
};

// 장바구니삭제
const deleteCart = async (req, res, next) => {
  if (!req.body.user) {
    logger.warn("유저 😵‍💫 들어온 데이터 값이 부족해...");
    return next(createError(400, "입력된 값이 없습니다."));
  }
  if (!checkReqBodyData(req, "productNum")) {
    logger.warn("😵‍💫 들어온 데이터 값이 부족해...");
    return next(createError(400, "입력된 값이 없습니다."));
  }

  const userId = req.body.user;
  const productNum = req.body.data.productNum;

  const deleteCartQuery = `delete from cart where t_users_id = '${userId}' and t_product_num ='${productNum}'`;

  const deleteCart = await awaitSql(deleteCartQuery)
    .catch((err) => {
      logger.error("😡 장바구니 삭제 중 SQL오류가 났어! -> " + err.message);
      return { err: err };
    })
    .then((result) => {
      return result;
    });

  if (!checkSql(deleteCart)) {
    logger.warn("😵‍💫 SQL에러 또는 변화된것이 없어!");

    return next(createError(403, "변화에 문제가 생겼습니다."));
  }
  return res.send(successStatus({ success: true }));
};

module.exports = { createCart, readCart, updateCart, deleteCart };
