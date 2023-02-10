require("dotenv").config();

const { default: axios } = require("axios").default;
const { logger } = require("../config/logger");
const { checkReqBodyData } = require("../module/check");
const { createError } = require("../module/error");
const { awaitSql, checkSql } = require("../module/sqlPromise");
const maria = require("../database/maria");
const { successStatus } = require("../module/statuscode");
const { tossCancelOrder, tossCancelProduct } = require("../module/toss");

const createUserOrder = async (req, res, next) => {
  if (
    !checkReqBodyData(
      req,
      "productList",
      "uuid",
      "paymentMethod",
      "name",
      "title",
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
  if (
    req.body.data.paymentMethod !== "카드" &&
    req.body.data.paymentMethod !== "가상계좌"
  ) {
    logger.warn("😵‍💫 잘못된 결제수단 데이터가 왔어...");
    return next(createError(401, "잘못된 결제수단"));
  }

  const productList = req.body.data.productList;
  const userId = req.body.user;
  const uuid = req.body.data.uuid;
  const paymentMethod = req.body.data.paymentMethod;
  const name = req.body.data.name;
  const title = req.body.data.title;
  const phone = req.body.data.phone;
  const addr = req.body.data.addr;
  const request = req.body.data.request;
  const productPriceList = req.body.productPriceList;
  const totalPrice = productPriceList.reduce((sum, currvalue) => {
    return sum + currvalue;
  }, 0);
  let productPriceListIndex = 0;

  maria.beginTransaction(async (err) => {
    if (err) {
      maria.rollback();
      logger.error("😡  createOrder 트랜젝션중 오류가 났어!");
    }

    // 주문을 생성하고 추가적으로 유저정보를 다른테이블에 추가한다.
    const createOrderQuery = `insert into t_order(t_order_uuid,t_order_status,t_order_payment_method,t_order_pay_status,t_order_name,t_order_title,t_order_phone,t_order_addr,t_order_request,t_order_total_price) values ('${uuid}','결제중','${paymentMethod}','F','${name}','${title}','${phone}','${addr}','${request}','${totalPrice}')`;
    const createOrder = await awaitSql(createOrderQuery)
      .catch((err) => {
        maria.rollback();
        logger.error(
          "😡 createOrderQuery 중 SQL오류가 났어! -> " + err.message
        );
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

    const createOrderUserQuery = `insert into t_order_user(t_order_uuid,t_users_id) values('${uuid}','${userId}')`;
    const createOrderUser = await awaitSql(createOrderUserQuery)
      .catch((err) => {
        maria.rollback();
        logger.error(
          "😡 createOrderUserQuery 중 SQL오류가 났어! -> " + err.message
        );
        return { err: err };
      })
      .then((result) => {
        return result;
      });
    if (!checkSql(createOrderUser)) {
      maria.rollback();
      logger.warn("createOrderUserQuery SQL에러 또는 변화된것이 없어!");
      return next(createError(403, "변화에 문제가 생겼습니다."));
    }

    for (const product of productList) {
      // 유저 쿠폰 듀얼,기본 쿠폰을 들고 온다 -> 그 쿠폰번호로 업데이트 -> orderproduct 생성;
      let couponUsersNum = null;
      let couponDualUsersNum = null;

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
        couponUsersNum = `'${getUserCouponNum[0].coupon_users_num}'`;
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
        const updateDualCouponStatus = await awaitSql(
          updateDualCouponStatusQuery
        )
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
        couponDualUsersNum = `'${getUserDualCouponNum[0].coupon_users_num}'`;
      }

      const createOrderProductQuery = `insert into t_order_product(t_order_uuid,t_product_num,t_product_count,total_price,t_order_name) values('${uuid}','${product.productNum}','${product.count}','${productPriceList[productPriceListIndex]}','${name}')`;
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

      const createOrderProductUserQuery = `insert into t_order_product_user(t_users_id,coupon_nomal_num,coupon_dual_num,t_order_product_num) values('${userId}',${couponUsersNum},${couponDualUsersNum},'${createOrderProduct.insertId}')`;
      const createOrderProductUser = await awaitSql(createOrderProductUserQuery)
        .catch((err) => {
          maria.rollback();
          logger.error(
            "😡 createOrderProductUserQuery 중 SQL오류가 났어! -> " +
              err.message
          );
          return { err: err };
        })
        .then((result) => {
          return result;
        });
      if (!checkSql(createOrderProductUser)) {
        maria.rollback();
        logger.warn(
          "createOrderProductUserQuery SQL에러 또는 변화된것이 없어!"
        );
        return next(createError(403, "변화에 문제가 생겼습니다."));
      }

      productPriceListIndex += 1;
    }
    maria.commit();
    return res.send("order");
  });
};
// 현금영수증 추가 등

// uuid로 변경
const cancelUserOrder = async (req, res, next) => {
  if (!checkReqBodyData(req, "uuid")) {
    logger.warn("😵‍💫 들어온 데이터 값이 부족해...");
    return next(createError(401, "들어온 값이 부족합니다."));
  }
  if (!req.body.user) {
    logger.warn("😵‍💫 들어온 유저 데이터 값이 부족해...");

    return next(createError(401, "값이없습니다."));
  }
  const uuid = req.body.data.uuid;
  const userId = req.body.user;

  const checkOrderQuery = `select * from t_order as o join t_order_user as ou on o.t_order_uuid = ou.t_order_uuid  where o.t_order_uuid = '${uuid}'`;
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
  if (checkOrder[0].t_users_id !== userId) {
    logger.warn(
      `😵‍💫 ${checkOrder[0].t_users_id} 유저가 다른 주문을 취소 할려고해요!`
    );
    return next(createError(403, "변화에 문제가 생겼습니다."));
  }
  if (
    checkOrder[0].t_order_status === "배송완료" ||
    checkOrder[0].t_order_status === "배송중" ||
    checkOrder[0].t_order_status === "상품준비중"
  ) {
    logger.warn("😵‍💫 상품이 발송되었는데 주문을 취소할려고해!");
    return next(createError(403, "상품 발송 되어서 환불을 하여야합니다!"));
  }

  // 결제가 되었을때만 실행 -> 토스페이먼츠키가 있는가
  if (checkOrder[0].t_order_paymentKey) {
    const paymentKey = checkOrder[0].t_order_paymentKey;
    // 주문상태에 따라 취소 불가

    const tossResults = await tossCancelOrder(paymentKey);
    if (tossResults.err) {
      return next(createError(500, tossResults.err));
    }

    if (!tossResults.status === "PARTIAL_CANCELED") {
      logger.error("😡 결제 취소되지 않았어!");
      return next(createError(500, "결제취소가 되지 않으셨습니다"));
    }
  }

  const updateCancelOrderQuery = `update t_order set t_order_status = '취소됨' where t_order_uuid='${uuid}'`;
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
// 부분 취소
const cancelUserProduct = async (req, res, next) => {
  if (!checkReqBodyData(req, "orderProductNum", "cancelReason")) {
    logger.warn("😵‍💫 들어온 데이터 값이 부족해...");
    return next(createError(401, "들어온 값이 부족합니다."));
  }

  if (!req.body.user) {
    logger.warn("😵‍💫 들어온 유저 데이터 값이 부족해...");
    return next(createError(401, "유저 값이없습니다."));
  }

  const orderProductNum = req.body.data.orderProductNum;
  const userId = req.body.user;
  const cancelReason = req.body.data.cancelReason || "유저가 주문을 취소함";

  // 이 물품의 주문서를 들고온다.
  const getUserOrderQuery = `select * from t_order_product as op join t_order_product_user as pu on op.t_order_product_num = pu.t_order_product_num join t_order as o on op.t_order_uuid = o.t_order_uuid join t_order_product_user as opu on op.t_order_product_num = opu.t_order_product_num where op.t_order_product_num = '${orderProductNum}'`;
  const getUserOrder = await awaitSql(getUserOrderQuery)
    .catch((err) => {
      logger.error("😡 checkOrderQuery 중 SQL오류가 났어! -> " + err.message);
      return { err: err };
    })
    .then((result) => {
      return result;
    });
  if (!checkSql(getUserOrder)) {
    logger.warn("😵‍💫 checkOrderQuery SQL에러 또는 변화된것이 없어!");
    return next(createError(501, "변화에 문제가 생겼습니다."));
  }

  if (getUserOrder.length === 0) {
    logger.warn("😵‍💫 checkOrderQuery 값이 없어!");
    return next(createError(501, "취소할려는 물품이 없습니다."));
  }

  // 이 물품이 취소된 적있는가, 유저 물품이 맞는지 확인해본다.
  if (getUserOrder[0].t_users_id !== userId) {
    logger.warn(userId + "유저가 다른 사람 주문을 바꿀려고합니다.");
    return next(createError(403, "변화에 문제가 생겼습니다."));
  }
  if (getUserOrder[0].t_order_cancel === "T") {
    logger.warn("😵‍💫 취소한 물품입니다!");
    return next(createError(501, "이미 취소 한 물품입니다."));
  }

  if (
    getUserOrder[0].t_order_status === "배송완료" ||
    getUserOrder[0].t_order_status === "배송중" ||
    getUserOrder[0].t_order_status === "상품준비중"
  ) {
    logger.warn("😵‍💫 상품이 발송되었는데 주문을 취소할려고해!");
    return next(createError(403, "상품 발송 되어서 환불을 하여야합니다!"));
  }

  // 결제 수단에 따라 취소 신청 -> 가상계좌, 일반결제 체크
  if (getUserOrder[0].t_order_paymentKey) {
    const paymentKey = getUserOrder[0].t_order_paymentKey;
    const totalPrice = getUserOrder[0].total_price;

    // 부분 취소 진행
    const tossResults = await tossCancelProduct(
      paymentKey,
      cancelReason,
      totalPrice
    );

    if (tossResults.err) {
      return next(createError(500, tossResults.err));
    }

    if (!tossResults.status === "PARTIAL_CANCELED") {
      logger.error("😡 결제 취소되지 않았어!");
      return next(createError(500, "결제취소가 되지 않으셨습니다"));
    }
  }

  // 취소 변경 후 쿠폰 및 스테이트 변경
  const updateOrderProductStateQuery = `update t_order_product set t_order_cancel = "T" where t_order_product_num =${orderProductNum} `;
  const updateOrderProductState = await awaitSql(updateOrderProductStateQuery)
    .catch((err) => {
      logger.error(
        "😡 updateOrderProductStateQuery 중 SQL오류가 났어! -> " + err.message
      );
      return { err: err };
    })
    .then((result) => {
      return result;
    });
  if (!checkSql(updateOrderProductState)) {
    logger.warn(
      "😵‍💫 updateOrderProductStateQuery SQL에러 또는 변화된것이 없어!"
    );
    return next(createError(501, "변화에 문제가 생겼습니다."));
  }

  if (getUserOrder[0].coupon_nomal_num) {
    const updateUserCouponQeury = `update coupon_users set coupon_status = 'N' where coupon_users_num = '${getUserOrder[0].coupon_nomal_num}'`;
    const updateUserCoupon = await awaitSql(updateUserCouponQeury)
      .catch((err) => {
        logger.error(
          "😡 updateUserCouponQeury 중 SQL오류가 났어! -> " + err.message
        );
        return { err: err };
      })
      .then((result) => {
        return result;
      });
    if (!checkSql(updateUserCoupon)) {
      logger.warn("😵‍💫 updateUserCouponQeury SQL에러 또는 변화된것이 없어!");
      return next(createError(501, "변화에 문제가 생겼습니다."));
    }
  }
  if (getUserOrder[0].coupon_dual_num) {
    const updateDualCouponQeury = `update coupon_users set coupon_status = 'N' where coupon_users_num = '${getUserOrder[0].coupon_dual_num}'`;
    const updateDualCoupon = await awaitSql(updateDualCouponQeury)
      .catch((err) => {
        logger.error(
          "😡 updateDualCouponQeury 중 SQL오류가 났어! -> " + err.message
        );
        return { err: err };
      })
      .then((result) => {
        return result;
      });
    if (!checkSql(updateDualCoupon)) {
      logger.warn("😵‍💫 updateDualCouponQeury SQL에러 또는 변화된것이 없어!");
      return next(createError(501, "변화에 문제가 생겼습니다."));
    }
  }
  return res.send("취소되었습니다.");
};

// 일반주문
const createOrder = async (req, res, next) => {
  if (
    !checkReqBodyData(
      req,
      "productList",
      "uuid",
      "name",
      "title",
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

  const productList = req.body.data.productList;
  const uuid = req.body.data.uuid;
  const name = req.body.data.name;
  const title = req.body.data.title;
  const phone = req.body.data.phone;
  const addr = req.body.data.addr;
  const request = req.body.data.request;
  const productPriceList = req.body.productPriceList;
  const totalPrice = productPriceList.reduce((sum, currvalue) => {
    return sum + currvalue;
  }, 0);
  let productPriceListIndex = 0;

  maria.beginTransaction(async (err) => {
    if (err) {
      maria.rollback();
      logger.error("😡  createOrder 트랜젝션중 오류가 났어!");
    }

    const createOrderQuery = `insert into t_order(t_order_uuid,t_order_status,t_order_pay_status,t_order_name,t_order_title,t_order_phone,t_order_addr,t_order_request,t_order_total_price) values ('${uuid}','결제중','F','${name}','${title}','${phone}','${addr}','${request}','${totalPrice}')`;
    const createOrder = await awaitSql(createOrderQuery)
      .catch((err) => {
        maria.rollback();
        logger.error(
          "😡 createOrderQuery 중 SQL오류가 났어! -> " + err.message
        );
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
      const createOrderProductQuery = `insert into t_order_product(t_order_uuid,t_product_num,t_product_count,total_price,t_order_name) values('${uuid}','${product.productNum}','${product.count}','${productPriceList[productPriceListIndex]}','${name}')`;
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
    return res.send("일반주문");
  });
};
const cancelOrder = async (req, res, next) => {
  if (!checkReqBodyData(req, "uuid", "name", "phone")) {
    logger.warn("😵‍💫 들어온 데이터 값이 부족해...");
    return next(createError(401, "들어온 값이 부족합니다."));
  }

  const uuid = req.body.data.uuid;
  const name = req.body.data.name;
  const phone = req.body.data.phone;

  const checkOrderQuery = `select * from t_order where t_order_uuid = '${uuid}' and t_order_name = '${name}' and t_order_phone = '${phone}'`;
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
    logger.warn("😵‍💫 checkOrderQuery의 결과값이 없어!");
    return next(createError(403, "변화에 문제가 생겼습니다."));
  }
  if (
    checkOrder[0].t_order_name !== name ||
    checkOrder[0].t_order_phone !== phone
  ) {
    logger.warn(`😵‍💫  유저가 다른 주문을 취소 할려고해요!`);
    return next(createError(403, "변화에 문제가 생겼습니다."));
  }

  if (
    checkOrder[0].t_order_status === "배송완료" ||
    checkOrder[0].t_order_status === "배송중" ||
    checkOrder[0].t_order_status === "상품준비중"
  ) {
    logger.warn("😵‍💫 상품이 발송되었는데 주문을 취소할려고해!");
    return next(createError(403, "상품 발송 되어서 환불을 하여야합니다!"));
  }

  const paymentKey = checkOrder[0].t_order_paymentKey;
  console.log(paymentKey);

  const tossResults = await tossCancelOrder(paymentKey);
  if (tossResults.err) {
    return next(createError(500, tossResults.err));
  }

  if (!tossResults.status === "PARTIAL_CANCELED") {
    logger.error("😡 결제 취소되지 않았어!");
    return next(createError(500, "결제취소가 되지 않으셨습니다"));
  }

  const updateCancelOrderQuery = `update t_order set t_order_status = '취소됨' where t_order_paymentKey='${paymentKey}'`;
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

  return res.send(successStatus({ massage: "주문 취소 성공" }));
};
const cancelProduct = async (req, res, next) => {
  if (
    !checkReqBodyData(req, "orderProductNum", "cancelReason", "name", "phone")
  ) {
    logger.warn("😵‍💫 들어온 데이터 값이 부족해...");
    return next(createError(401, "들어온 값이 부족합니다."));
  }

  const orderProductNum = req.body.data.orderProductNum;
  const name = req.body.data.name;
  const phone = req.body.data.phone;
  const cancelReason = req.body.data.cancelReason || "유저가 주문을 취소함";

  // 이 물품의 주문서를 들고온다.
  const getOrderQuery = `select * from t_order_product as op join t_order as o on op.t_order_uuid = o.t_order_uuid where op.t_order_product_num = '${orderProductNum}'`;
  const getOrder = await awaitSql(getOrderQuery)
    .catch((err) => {
      logger.error("😡 checkOrderQuery 중 SQL오류가 났어! -> " + err.message);
      return { err: err };
    })
    .then((result) => {
      return result;
    });
  if (!checkSql(getOrder)) {
    logger.warn("😵‍💫 getOrderQuery SQL에러 또는 변화된것이 없어!");
    return next(createError(501, "변화에 문제가 생겼습니다."));
  }

  if (getOrder.length === 0) {
    logger.warn("😵‍💫 getOrderQuery 값이 없어!");
    return next(createError(501, "취소할려는 물품이 없습니다."));
  }

  // 이 물품이 취소된 적있는가, 유저 물품이 맞는지 확인해본다.
  if (
    getOrder[0].t_order_name !== name ||
    getOrder[0].t_order_phone !== phone
  ) {
    logger.warn(
      "이름 : " +
        getOrder[0].t_order_name +
        " 번호 " +
        getOrder[0].t_order_phone +
        "가 " +
        orderProductNum +
        "번의 다른 사람 주문을 바꿀려고합니다."
    );
    return next(createError(403, "변화에 문제가 생겼습니다."));
  }
  if (getOrder[0].t_order_cancel === "T") {
    logger.warn("😵‍💫 취소한 물품입니다!");
    return next(createError(501, "이미 취소 한 물품입니다."));
  }
  if (!getOrder[0].t_order_paymentKey) {
    logger.warn("😵‍💫 토스 주문 키가 없습니다.");
    return next(createError(403, "잘못된 주문 물품입니다."));
  }

  if (
    getOrder[0].t_order_status === "배송완료" ||
    getOrder[0].t_order_status === "배송중" ||
    getOrder[0].t_order_status === "상품준비중"
  ) {
    logger.warn("😵‍💫 상품이 발송되었는데 주문을 취소할려고해!");
    return next(createError(403, "상품 발송 되어서 환불을 하여야합니다!"));
  }

  const paymentKey = getOrder[0].t_order_paymentKey;
  const totalPrice = getOrder[0].total_price;

  // 부분 취소 진행
  const tossResults = await tossCancelProduct(
    paymentKey,
    cancelReason,
    totalPrice
  );

  if (tossResults.err) {
    return next(createError(500, tossResults.err));
  }

  if (!tossResults.status === "PARTIAL_CANCELED") {
    logger.error("😡 결제 취소되지 않았어!");
    return next(createError(500, "결제취소가 되지 않으셨습니다"));
  }
  // 취소 변경 후 쿠폰 및 스테이트 변경
  const updateOrderProductStateQuery = `update t_order_product set t_order_cancel = "T" where t_order_product_num =${orderProductNum} `;
  const updateOrderProductState = await awaitSql(updateOrderProductStateQuery)
    .catch((err) => {
      logger.error(
        "😡 updateOrderProductStateQuery 중 SQL오류가 났어! -> " + err.message
      );
      return { err: err };
    })
    .then((result) => {
      return result;
    });
  if (!checkSql(updateOrderProductState)) {
    logger.warn(
      "😵‍💫 updateOrderProductStateQuery SQL에러 또는 변화된것이 없어!"
    );
    return next(createError(501, "변화에 문제가 생겼습니다."));
  }

  return res.send("캔슬프로덕트");
};
module.exports = {
  createUserOrder,
  cancelUserOrder,
  cancelUserProduct,
  createOrder,
  cancelOrder,
  cancelProduct,
};
