require("dotenv").config();

const { default: axios } = require("axios").default;
const { logger } = require("../config/logger");
const { createError } = require("../module/error");
const { awaitSql, checkSql } = require("../module/sqlPromise");
const { successStatus } = require("../module/statuscode");

const cardUserPaymentConfirm = async (req, res, next) => {
  const paymentKey = req.query.paymentKey;
  const orderId = req.query.orderId;
  const amount = req.query.amount;

  const options = {
    method: "POST",
    url: "https://api.tosspayments.com/v1/payments/confirm",
    headers: {
      Authorization: process.env.TOSSPAYMENTS_SECRIT_KEY,
      "Content-Type": "application/json",
    },
    data: {
      paymentKey: paymentKey,
      amount: amount,
      orderId: orderId,
    },
  };

  const tossResults = await axios
    .request(options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      logger.error("😡 토스 결제에 실패했어! \n" + error);
      return {
        err: "결제실패입니다.",
      };
    });
  if (tossResults.err) {
    return next(createError(500, tossResults.err));
  }
  if (!tossResults.status === "DONE") {
    logger.error("😡 돈이 들어오지 않았어!");
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

module.exports = { cardUserPaymentConfirm };
