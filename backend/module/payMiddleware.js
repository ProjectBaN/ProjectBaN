const { logger } = require("../config/logger");
const { createError } = require("../module/error");
const { awaitSql, checkSql } = require("../module/sqlPromise");

const checkCardPayment = async (req, res, next) => {
  if (!req.query.paymentKey || !req.query.orderId || !req.query.amount) {
    logger.warn("😵‍💫 들어온 값이 부족해!");
    return next(createError(403, "값이 부족합니다."));
  }
  const paymentKey = req.query.paymentKey;
  const orderId = req.query.orderId;
  const amount = req.query.amount;

  const checkOrderQuery = `select * from t_order where t_order_uuid='${orderId}' and t_order_pay_status='F' and t_order_total_price='${amount}'`;
  const checkOrder = await awaitSql(checkOrderQuery)
    .catch((err) => {
      logger.error(
        "😡 비회원 checkOrderQuery 중 SQL오류가 났어! -> " + err.message
      );
      return { err: err };
    })
    .then((result) => {
      return result;
    });
  if (!checkSql(checkOrder)) {
    logger.warn("😵‍💫 비회원 checkOrderQuery SQL에러 또는 변화된것이 없어!");
    return next(createError(403, "변화에 문제가 생겼습니다."));
  }
  if (checkOrder.length === 0) {
    logger.warn(
      "😵‍💫 checkOrderQuery의 결과값이 없어! 또는 잘못된 금액을 적었어!"
    );
    return next(createError(403, "변화에 문제가 생겼습니다."));
  }
  if (checkOrder[0].t_order_payment_method !== "카드") {
    logger.warn("😵‍💫 카드 결제가 아닌데 결제가 왔어!");
    return next(createError(403, "변화에 문제가 생겼습니다."));
  }

  return next();
};
const checkBankPayment = async (req, res, next) => {
  if (!req.query.paymentKey || !req.query.orderId || !req.query.amount) {
    logger.warn("😵‍💫 들어온 값이 부족해!");
    return next(createError(403, "값이 부족합니다."));
  }
  const paymentKey = req.query.paymentKey;
  const orderId = req.query.orderId;
  const amount = req.query.amount;

  const checkOrderQuery = `select * from t_order where t_order_uuid='${orderId}' and t_order_pay_status='F' and t_order_total_price='${amount}'`;
  const checkOrder = await awaitSql(checkOrderQuery)
    .catch((err) => {
      logger.error(
        "😡 비회원 checkOrderQuery 중 SQL오류가 났어! -> " + err.message
      );
      return { err: err };
    })
    .then((result) => {
      return result;
    });
  if (!checkSql(checkOrder)) {
    logger.warn("😵‍💫 비회원 checkOrderQuery SQL에러 또는 변화된것이 없어!");
    return next(createError(403, "변화에 문제가 생겼습니다."));
  }
  if (checkOrder.length === 0) {
    logger.warn(
      "😵‍💫 checkOrderQuery의 결과값이 없어! 또는 잘못된 금액을 적었어!"
    );
    return next(createError(403, "변화에 문제가 생겼습니다."));
  }
  if (checkOrder[0].t_order_payment_method !== "가상계좌") {
    logger.warn("😵‍💫 가상계좌 결제가 아닌데 결제가 왔어!");
    return next(createError(403, "변화에 문제가 생겼습니다."));
  }

  return next();
};

module.exports = { checkCardPayment, checkBankPayment };
