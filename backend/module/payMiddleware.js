const { logger } = require("../config/logger");
const { createError } = require("../module/error");
const { awaitSql, checkSql } = require("../module/sqlPromise");

const checkUserPayment = async (req, res, next) => {
  const paymentKey = req.query.paymentKey;
  const orderId = req.query.orderId;
  const amount = req.query.amount;

  // 결제가 안되었고, uuid가 같으며 금액이 같은 주문을 조회한다.
  const checkOrderQuery = `select * from t_user_order where t_order_uuid='${orderId}' and t_order_pay_status='F' and t_order_total_price='${amount}'`;
  const checkOrder = await awaitSql(checkOrderQuery)
    .catch((err) => {
      logger.error("😡 checkOrderQuery 중 SQL오류가 났어! -> " + err.message);
      return { err: err };
    })
    .then((result) => {
      return result;
    });
  if (!checkSql(checkOrder)) {
    logger.warn("😵‍💫 checkOrderQuery SQL에러 또는 변화된것이 없어!");
    return next(createError(403, "변화에 문제가 생겼습니다."));
  }
  if (checkOrder.length === 0) {
    logger.warn(
      "😵‍💫 checkOrderQuery의 결과값이 없어! 또는 잘못된 금액을 적었어!"
    );
    return next(createError(403, "변화에 문제가 생겼습니다."));
  }
  return next();
};

module.exports = { checkUserPayment };
