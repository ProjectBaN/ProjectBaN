require("dotenv").config();

const { default: axios } = require("axios").default;
const { logger } = require("../config/logger");
const { checkReqBodyData } = require("../module/check");
const { createError } = require("../module/error");
const { awaitSql, checkSql } = require("../module/sqlPromise");
const maria = require("../database/maria");

const createUserOrder = async (req, res, next) => {
  if (
    !checkReqBodyData(
      req,
      "productList",
      "uuid",
      "name",
      "phone",
      "addr",
      "request"
    )
  ) {
    logger.warn("😵‍💫 들어온 데이터 값이 부족해...");

    return next(createError(401, "값이없습니다."));
  }

  if (!req.body.productPriceList) {
    logger.warn("😵‍💫 productPriceList 데이터가 없어...");
    return next(createError(401, "총금액이 없습니다."));
  }
  if (!req.body.user) {
    logger.warn("😵‍💫 유저 데이터가 없어...");
    return next(createError(401, "유저데이터가 없습니다."));
  }
  const productList = req.body.data.productList;
  const userId = req.body.user;
  const uuid = req.body.data.uuid;
  const name = req.body.data.name;
  const phone = req.body.data.phone;
  const addr = req.body.data.addr;
  const request = req.body.data.request;
  const productPriceList = req.body.productPriceList;
  const totalPrice = productPriceList.reduce((sum, currvalue) => {
    return sum + currvalue;
  }, 0);
  let productPriceListIndex = 0;

  maria.beginTransaction((err) => {
    if (err) {
      maria.rollback();
      logger.error("😡  createOrder 트랜젝션중 오류가 났어!");
    }
  });

  const createOrderQuery = `insert into t_user_order(t_order_uuid,t_order_status,t_order_pay_status,t_users_id,t_order_name,t_order_phone,t_order_addr,t_order_request,t_order_total_price) values ('${uuid}','결제중','F','${userId}','${name}','${phone}','${addr}','${request}','${totalPrice}')`;
  const createOrder = await awaitSql(createOrderQuery)
    .catch((err) => {
      maria.rollback();
      logger.error("😡 createOrderQuery 중 SQL오류가 났어! -> " + err.message);
      return { err: err };
    })
    .then((result) => {
      return result;
    });
  if (!checkSql(createOrder)) {
    maria.rollback();
    logger.warn("😵‍💫createOrderQuery SQL에러 또는 변화된것이 없어!");
    return next(createError(403, "변화에 문제가 생겼습니다."));
  }

  for (const product of productList) {
    // 유저 쿠폰 듀얼,기본 쿠폰을 들고 온다 -> 그 쿠폰번호로 업데이트 -> orderproduct 생성;
    let couponUsersNum = null;
    let couponDualUsersNum = null;
    // 쿠폰사용도 넣기
    if (product.nomalCoupon) {
      const getUserCouponNumQuery = `select * from coupon_users where coupon_num = '${product.nomalCoupon.couponNum}'`;
      const getUserCouponNum = await awaitSql(getUserCouponNumQuery)
        .catch((err) => {
          maria.rollback();
          logger.error(
            "😡 getUserCouponNumQuery 중 SQL오류가 났어! -> " + err.message
          );
          return { err: err };
        })
        .then((result) => {
          return result;
        });
      if (!checkSql(getUserCouponNum)) {
        maria.rollback();
        logger.warn("😵‍💫getUserCouponNumQuery SQL에러 또는 변화된것이 없어!");
        return next(createError(403, "변화에 문제가 생겼습니다."));
      }
      if (getUserCouponNum.length === 0) {
        maria.rollback();
        logger.warn("😵‍💫getUserCouponNumQuery 데이터가 없어!");
        return next(createError(403, "변화에 문제가 생겼습니다."));
      }
      couponUsersNum = getUserCouponNum[0].coupon_users_num;

      const updateCouponStatusQuery = `update coupon_users set coupon_status = 'Y' where coupon_users_num = '${couponUsersNum}'`;
      const updateCouponStatus = await awaitSql(updateCouponStatusQuery)
        .catch((err) => {
          maria.rollback();
          logger.error(
            "😡 updateCouponStatus 중 SQL오류가 났어! -> " + err.message
          );
          return { err: err };
        })
        .then((result) => {
          return result;
        });
      if (!checkSql(updateCouponStatus)) {
        maria.rollback();
        logger.warn("updateCouponStatus SQL에러 또는 변화된것이 없어!");
        return next(createError(403, "변화에 문제가 생겼습니다."));
      }
    }

    if (product.dualCoupon) {
      const getUserDualCouponNumQuery = `select * from coupon_users where coupon_num = '${product.dualCoupon.couponNum}'`;
      const getUserDualCouponNum = await awaitSql(getUserDualCouponNumQuery)
        .catch((err) => {
          maria.rollback();
          logger.error(
            "😡 updateCouponStatus 중 SQL오류가 났어! -> " + err.message
          );
          return { err: err };
        })
        .then((result) => {
          return result;
        });
      if (!checkSql(getUserDualCouponNum)) {
        maria.rollback();
        logger.warn("getUserDualCouponNum SQL에러 또는 변화된것이 없어!");
        return next(createError(403, "변화에 문제가 생겼습니다."));
      }
      if (getUserDualCouponNum.length === 0) {
        maria.rollback();
        logger.warn("getUserDualCouponNum 데이터가 없어!");
        return next(createError(403, "변화에 문제가 생겼습니다."));
      }
      couponDualUsersNum = getUserDualCouponNum[0].coupon_users_num;

      const updateDualCouponStatusQuery = `update coupon_users set coupon_status = 'Y' where coupon_users_num = '${couponDualUsersNum}'`;
      const updateDualCouponStatus = await awaitSql(updateDualCouponStatusQuery)
        .catch((err) => {
          maria.rollback();
          logger.error(
            "😡 updateDualCouponStatus 중 SQL오류가 났어! -> " + err.message
          );
          return { err: err };
        })
        .then((result) => {
          return result;
        });
      if (!checkSql(updateDualCouponStatus)) {
        maria.rollback();
        logger.warn("updateDualCouponStatus SQL에러 또는 변화된것이 없어!");
        return next(createError(403, "변화에 문제가 생겼습니다."));
      }
    }

    const createOrderProductQuery = `insert into t_user_order_product(t_order_uuid,t_product_num, t_users_id, coupon_users_num,coupon_dual_num,t_product_count,total_price) values('${uuid}','${product.productNum}','${userId}',${couponUsersNum},${couponDualUsersNum},'${product.count}','${productPriceList[productPriceListIndex]}')`;
    const createOrderProduct = await awaitSql(createOrderProductQuery)
      .catch((err) => {
        maria.rollback();
        logger.error(
          "😡 createOrderProduct 중 SQL오류가 났어! -> " + err.message
        );
        return { err: err };
      })
      .then((result) => {
        return result;
      });
    if (!checkSql(createOrderProduct)) {
      maria.rollback();
      logger.warn("😵‍💫createOrderProduct SQL에러 또는 변화된것이 없어!");
      return next(createError(403, "변화에 문제가 생겼습니다."));
    }
    productPriceListIndex += 1;
  }
  maria.commit();
  return res.send("order");
};
// 현금영수증 추가 등
const cancelUserOrder = async (req, res, next) => {
  if (!checkReqBodyData(req, "paymentKey")) {
    logger.warn("😵‍💫 들어온 데이터 값이 부족해...");
    return res.status(401).send();
  }
  if (!req.body.user) {
    logger.warn("😵‍💫 들어온 유저 데이터 값이 부족해...");

    return next(createError(401, "값이없습니다."));
  }
  const paymentKey = req.body.data.paymentKey;
  const userId = req.body.user;

  const checkPaymentKeyQuery = `select * from t_user_order where t_order_paymentKey = '${paymentKey}'`;
  const checkPaymentKey = await awaitSql(checkPaymentKeyQuery)
    .catch((err) => {
      logger.error(
        "😡 checkPaymentKeyQuery 중 SQL오류가 났어! -> " + err.message
      );
      return { err: err };
    })
    .then((result) => {
      return result;
    });
  if (!checkSql(checkPaymentKey)) {
    logger.warn("😵‍💫 checkPaymentKeyQuery SQL에러 또는 변화된것이 없어!");
    return next(createError(403, "변화에 문제가 생겼습니다."));
  }
  if (checkPaymentKey[0].t_users_id !== userId) {
    logger.warn(
      `😵‍💫 ${checkPaymentKey[0].t_users_id} 유저가 다른 주문을 취소 할려고해요!`
    );
    return next(createError(403, "변화에 문제가 생겼습니다."));
  }
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

  if (tossResults.err) {
    return next(createError(500, tossResults.err));
  }

  if (!tossResults.status === "PARTIAL_CANCELED") {
    logger.error("😡 결제 취소되지 않았어!");
    return next(createError(500, "결제취소가 되지 않으셨습니다"));
  }

  const updateCancelOrderQuery = `update t_user_order set t_order_status = '취소됨' where t_order_paymentKey='${paymentKey}'`;
  const updateCancelOrder = await awaitSql(updateCancelOrderQuery)
    .catch((err) => {
      logger.error(
        "😡 updateCancelOrderQuery 중 SQL오류가 났어! -> " + err.message
      );
      return { err: err };
    })
    .then((result) => {
      return result;
    });
  if (!checkSql(updateCancelOrder)) {
    logger.warn("😵‍💫 updateCancelOrderQuery SQL에러 또는 변화된것이 없어!");
    return next(createError(403, "변화에 문제가 생겼습니다."));
  }

  return res.send("캔슬오더");
};

// 현금영수증 추가 등

// 가상계좌 확인

module.exports = {
  createUserOrder,
  cancelUserOrder,
};
