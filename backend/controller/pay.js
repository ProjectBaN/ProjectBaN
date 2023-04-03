require("dotenv").config();

const { default: axios } = require("axios").default;
const { logger } = require("../config/logger");
const { createError } = require("../module/error");
const { awaitSql, checkSql } = require("../module/sqlPromise");
const { successStatus } = require("../module/statuscode");
const { tossCardConfirm } = require("../module/toss");

// 폐기예정
const cardUserPaymentConfirm = async (req, res, next) => {
  if (!req.query.paymentKey || !req.query.orderId || !req.query.amount) {
    logger.warn("😵‍💫 들어온 값이 부족해!");
    return next(createError(403, "값이 부족합니다."));
  }
  const paymentKey = req.query.paymentKey;
  const orderId = req.query.orderId;
  const amount = req.query.amount;

  const tossResults = await tossCardConfirm(paymentKey, amount, orderId);
  if (tossResults.err) {
    return next(createError(500, tossResults.err));
  }
  if (!tossResults.status === "DONE") {
    logger.error("😡 돈이 들어오지 않았어!");
    return next(createError(500, "결제가 되지 않으셨습니다"));
  }

  // 결제 정보 업데이트
  const updateOrderStatusQuery = `update t_user_order set t_order_pay_status = "T",t_order_status = '결제완료',t_order_paymentKey = '${tossResults.paymentKey}' where t_order_uuid = '${orderId}'`;
  const updateOrderStatus = await awaitSql(updateOrderStatusQuery)
    .catch((err) => {
      logger.error(
        "😡 updateOrderStatusQuery 중 SQL오류가 났어! -> " + err.message
      );
      return { err: err };
    })
    .then((result) => {
      return result;
    });
  if (!checkSql(updateOrderStatus)) {
    logger.warn("😵‍💫 updateOrderStatusQuery SQL에러 또는 변화된것이 없어!");
    return next(createError(403, "변화에 문제가 생겼습니다."));
  }
  // 현금영수증있는지 체크

  return res.send(successStatus({ successStatus: true }));
};

const cardPaymentConfirm = async (req, res, next) => {
  if (!req.query.paymentKey || !req.query.orderId || !req.query.amount) {
    logger.warn("😵‍💫 들어온 값이 부족해!");
    return next(createError(403, "값이 부족합니다."));
  }
  const paymentKey = req.query.paymentKey;
  const orderId = req.query.orderId;
  const amount = req.query.amount;

  const tossResults = await tossCardConfirm(paymentKey, amount, orderId);

  if (tossResults.err) {
    return next(createError(500, tossResults.err));
  }

  if (!tossResults.status === "DONE") {
    logger.error("😡 돈이 들어오지 않았어!");
    return next(createError(500, "결제가 되지 않으셨습니다"));
  }

  // 결제 정보 업데이트
  const updateOrderStatusQuery = `update t_order set t_order_pay_status = "T",t_order_status = '결제완료',t_order_paymentKey = '${tossResults.paymentKey}' where t_order_uuid = '${orderId}'`;
  const updateOrderStatus = await awaitSql(updateOrderStatusQuery)
    .catch((err) => {
      logger.error(
        "😡 updateOrderStatusQuery 중 SQL오류가 났어! -> " + err.message
      );
      return { err: err };
    })
    .then((result) => {
      return result;
    });
  if (!checkSql(updateOrderStatus)) {
    logger.warn("😵‍💫 updateOrderStatusQuery SQL에러 또는 변화된것이 없어!");
    return next(createError(403, "변화에 문제가 생겼습니다."));
  }

  // 현금영수증있는지 체크
  return res.send(successStatus({ successStatus: true }));
};
const bankPaymentConfirm = async (req, res, next) => {
  if (!req.query.paymentKey || !req.query.orderId || !req.query.amount) {
    logger.warn("😵‍💫 들어온 값이 부족해!");
    return next(createError(403, "값이 부족합니다."));
  }
  const paymentKey = req.query.paymentKey;
  const orderId = req.query.orderId;
  const amount = req.query.amount;

  const tossResults = await tossCardConfirm(paymentKey, amount, orderId);

  if (tossResults.err) {
    return next(createError(500, tossResults.err));
  }
  if (!tossResults.secret) {
    logger.warn("😵‍💫 시크릿 키가 발급 되지 않았어!!");
    return next(createError(500, tossResults.err));
  }

  // 결제 정보 업데이트
  const updateOrderStatusQuery = `update t_order set t_order_paymentKey = '${tossResults.paymentKey}', t_order_toss_secret = '${tossResults.secret}' where t_order_uuid = '${orderId}'`;
  const updateOrderStatus = await awaitSql(updateOrderStatusQuery)
    .catch((err) => {
      logger.error(
        "😡 updateOrderStatusQuery 중 SQL오류가 났어! -> " + err.message
      );
      return { err: err };
    })
    .then((result) => {
      return result;
    });
  if (!checkSql(updateOrderStatus)) {
    logger.warn("😵‍💫 updateOrderStatusQuery SQL에러 또는 변화된것이 없어!");
    return next(createError(403, "변화에 문제가 생겼습니다."));
  }

  return res.send(
    successStatus({ account: tossResults.virtualAccount.accountNumber })
  );
};
const bankPaymentWebHook = async (req, res, next) => {
  if (!req.body.secret || !req.body.status || !req.body.orderId) {
    logger.warn("😵‍💫 들어온 값이 부족해!");
    return next(createError(403, "값이 부족합니다."));
  }
  const secret = req.body.secret;
  const status = req.body.status;
  const orderId = req.body.orderId;

  if (status !== "DONE") {
    logger.warn("orderId = " + orderId + " 😵‍💫 문제가 생겨 다시 입금하여야되");
    return next(createError(403, "문제가 생겨 다시 입금해야됩니다."));
  }

  const checkSecretQuery = `select * from t_order where t_order_uuid = '${orderId}'`;
  const checkSecret = await awaitSql(checkSecretQuery)
    .catch((err) => {
      logger.error("😡 checkSecretQuery 중 SQL오류가 났어! -> " + err.message);
      return { err: err };
    })
    .then((result) => {
      return result;
    });
  if (!checkSql(checkSecret)) {
    logger.warn("😵‍💫 checkSecretQuery SQL에러 또는 변화된것이 없어!");
    return next(createError(403, "변화에 문제가 생겼습니다."));
  }
  if (checkSecret.length === 0) {
    logger.warn("checkSecretQuery 데이터가 없어!");
    return next(createError(403, "변화에 문제가 생겼습니다."));
  }
  if (checkSecret[0].t_order_toss_secret !== secret) {
    logger.warn("시크릿 키가 달라!");
    return next(createError(403, "시크릿 키가 다릅니다."));
  }
  const updateOrderStatusQuery = `update t_order set t_order_pay_status = "T",t_order_status = '결제완료' where t_order_uuid = '${orderId}'`;
  const updateOrderStatus = await awaitSql(updateOrderStatusQuery)
    .catch((err) => {
      logger.error(
        "😡 updateOrderStatusQuery 중 SQL오류가 났어! -> " + err.message
      );
      return { err: err };
    })
    .then((result) => {
      return result;
    });
  if (!checkSql(updateOrderStatus)) {
    logger.warn("😵‍💫 updateOrderStatusQuery SQL에러 또는 변화된것이 없어!");
    return next(createError(403, "변화에 문제가 생겼습니다."));
  }

  // 현금영수증있는지 체크
  return res.send(successStatus({ successStatus: true }));
};
module.exports = {
  cardUserPaymentConfirm,
  cardPaymentConfirm,
  bankPaymentConfirm,
  bankPaymentWebHook,
};
