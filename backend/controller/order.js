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
    const createOrderProductQuery = `insert into t_user_order_product(t_order_uuid,t_product_num,coupon_users_num,coupon_dual_num,t_product_count,total_price) values('${uuid}','45',${couponUsersNum},${couponDualUsersNum},'2','${productPriceList[productPriceListIndex]}')`;
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
//  토스 결제신청후  맞는지 확인

//  결제 완료 리턴

// 현금영수증 추가 등

// 가상계좌 확인

module.exports = {
  createUserOrder,
};
