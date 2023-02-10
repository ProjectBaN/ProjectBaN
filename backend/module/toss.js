require("dotenv").config();

const { default: axios } = require("axios").default;
const { logger } = require("../config/logger");
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

const tossCancelOrder = async (paymentKey) => {
  // 주문상태에 따라 취소 불가
  const options = {
    method: "POST",
    url: `https://api.tosspayments.com/v1/payments/${paymentKey}/cancel`,
    headers: {
      Authorization: process.env.TOSSPAYMENTS_SECRIT_KEY,
      "Content-Type": "application/json",
    },
    data: { cancelReason: "고객이 취소를 원함" },
  };

  const tossResults = await axios
    .request(options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      logger.error("😡 토스 결제 취소가 실패했어! \n" + error);
      return {
        err: "취소 실패 입니다.",
      };
    });
  return tossResults;
};

const tossCancelProduct = async (paymentKey, reason, amount) => {
  // 주문상태에 따라 취소 불가
  const options = {
    method: "POST",
    url: `https://api.tosspayments.com/v1/payments/${paymentKey}/cancel`,
    headers: {
      Authorization: process.env.TOSSPAYMENTS_SECRIT_KEY,
      "Content-Type": "application/json",
    },
    data: { cancelReason: reason, cancelAmount: amount },
  };

  const tossResults = await axios
    .request(options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      logger.error("😡 토스 결제 취소가 실패했어! \n" + error);
      return {
        err: "취소 실패 입니다.",
      };
    });
  return tossResults;
};

const tossCancelProductVirtualAccount = async (
  paymentKey,
  reason,
  amount,
  bank,
  accountNumber,
  holderName
) => {
  const options = {
    method: "POST",
    url: `https://api.tosspayments.com/v1/payments/${paymentKey}/cancel`,
    headers: {
      Authorization: process.env.TOSSPAYMENTS_SECRIT_KEY,
      "Content-Type": "application/json",
    },
    data: {
      cancelReason: reason,
      cancelAmount: amount,
      refundReceiveAccount: {
        bank: bank,
        accountNumber: accountNumber,
        holderName: holderName,
      },
    },
  };

  const tossResults = await axios
    .request(options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      logger.error("😡 토스 결제 취소가 실패했어! \n" + error);
      return {
        err: "취소 실패 입니다.",
      };
    });
  return tossResults;
};
module.exports = {
  tossCardConfirm,
  tossCancelOrder,
  tossCancelProduct,
  tossCancelProductVirtualAccount,
};
