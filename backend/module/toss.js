require("dotenv").config();

const { default: axios } = require("axios").default;
const { awaitSql, checkSql } = require("../module/sqlPromise");

/* 토스 카드결제 확인 모듈 */
const tossCardConfirm = async (paymentKey, amount, orderId) => {
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

  return tossResults;
};

module.exports = { tossCardConfirm };
