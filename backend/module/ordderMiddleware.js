const { logger } = require("../config/logger");
const { checkReqBodyData } = require("./check");
const { createError } = require("./error");
const { awaitSql, checkSql } = require("./sqlPromise");

// 사용가능한 쿠폰 갯수와 지금 장바구니 쿠폰 갯수 체크 -> 카테고리 쿠폰체크 -> 쿠폰들 사용 및 주문서 작성
const orderCouponCheck = async (req, res, next) => {
  if (!checkReqBodyData(req, "productList")) {
    logger.warn("😵‍💫 들어온 데이터 값이 부족해...");

    return next(createError(401, "값이없습니다."));
  }

  const productList = req.body.data.productList;

  if (!Array.isArray(productList) || productList.length === 0) {
    logger.warn("😵‍💫 잘못된 물품 리스트야...");
    return next(createError(401, "잘못된 리스트입니다."));
  }
  const result = {};

  for (const orderProduct of productList) {
    if (orderProduct.nomalCoupon) {
      result[orderProduct.nomalCoupon.couponNum] =
        (result[orderProduct.nomalCoupon.couponNum] || 0) + 1;
    }
    if (orderProduct.dualCoupon) {
      result[orderProduct.dualCoupon.couponNum] =
        (result[orderProduct.dualCoupon.couponNum] || 0) + 1;
    }
  }

  for (const key in result) {
    const getUserCouponCountQuery = `select * from coupon_users where coupon_num = ${key} and coupon_status='N'`;
    const getUserCouponCount = await awaitSql(getUserCouponCountQuery)
      .catch((err) => {
        logger.error("😡 쿠폰갯수를 얻는 중 SQL오류가 났어! -> " + err.message);
        return { err: err };
      })
      .then((result) => {
        return result;
      });

    if (!checkSql(getUserCouponCount)) {
      logger.warn("😵‍💫쿠폰갯수 SQL에러 또는 변화된것이 없어!");
      return next(createError(403, "변화에 문제가 생겼습니다."));
    }
    if (getUserCouponCount.length === 0) {
      return next(createError(403, "사용가능한 쿠폰이 없습니다."));
    }
    if (getUserCouponCount.length < result[key]) {
      return next(createError(403, key + " 사용할려는 쿠폰이 더 많습니다."));
    }
  }
  return next();
};
// 사용하는 쿠폰의 카테고리가 일치하는지 체크
const orderCouponCategoryCheck = async (req, res, next) => {
  if (!checkReqBodyData(req, "productList")) {
    logger.warn("😵‍💫 들어온 데이터 값이 부족해...");

    return next(createError(401, "값이없습니다."));
  }
  const productList = req.body.data.productList;
  // 쿠폰을 각각들고와 category인지 체크 아님 넘기기
  // 카테고리 판별을 위해 카테고리쿠폰들을 들고옴

  // 쿠폰이 카테고리 쿠폰인지 확인

  for (const product of productList) {
    if (!product.nomalCoupon || !product.nomalCoupon.couponNum) {
      continue;
    }
    const nomalCouponNum = product.nomalCoupon.couponNum;
    const productNum = product.productNum;

    const getUserCouponQuery = `select * from coupon where coupon_num = ${nomalCouponNum} and coupon_valied_end > now()`;
    const getUserCoupon = await awaitSql(getUserCouponQuery)
      .catch((err) => {
        logger.error("😡 getUserCoupon 중 SQL오류가 났어! -> " + err.message);
        return { err: err };
      })
      .then((result) => {
        return result;
      });
    if (!checkSql(getUserCoupon)) {
      logger.warn("😵‍💫 getUserCoupon SQL에러 또는 변화된것이 없어!");
      return next(createError(403, "변화에 문제가 생겼습니다."));
    }
    if (getUserCoupon.length === 0) {
      logger.warn("getUserCoupon 값이 없어!");
      return next(createError(403, "변화에 문제가 생겼습니다."));
    }
    if (getUserCoupon[0].coupon_type !== "CATEGORY") {
      continue;
    }

    const checkProductCategoryQuery = `select * from t_product as p join coupon_sale_category_product as cscp on p.t_product_num = cscp.t_product_num  where p.t_product_num = ${productNum}`;
    const checkProductCategory = await awaitSql(checkProductCategoryQuery)
      .catch((err) => {
        logger.error("😡 productCheck 중 SQL오류가 났어! -> " + err.message);
        return { err: err };
      })
      .then((result) => {
        return result;
      });
    if (!checkSql(checkProductCategory)) {
      logger.warn("😵‍💫 productCheck SQL에러 또는 변화된것이 없어!");
      return next(createError(403, "변화에 문제가 생겼습니다."));
    }
    if (checkProductCategory.length === 0) {
      logger.warn("😵‍💫 productCheck의 값이 없어!");
      return next(createError(403, "변화에 문제가 생겼습니다."));
    }
    // product의 세일 카테고리를 정리
    const getProductCategory = checkProductCategory.map((el) => {
      return el.coupon_sale_category;
    });

    if (
      !getProductCategory.includes(getUserCoupon[0].coupon_sale_category_name)
    ) {
      logger.error("😡 잘못된 쿠폰 카테고리 오류가 났어!");
      return next(createError(500, "잘못된 쿠폰 카테고리입니다."));
    }
  }
  return next();
};
const totalCouponPrice = async (req, res, next) => {
  if (!checkReqBodyData(req, "productList")) {
    logger.warn("😵‍💫 들어온 데이터 값이 부족해...");

    return next(createError(401, "값이없습니다."));
  }
  const productList = req.body.data.productList;
  const productPriceList = [];
  for (const product of productList) {
    const getProductQuery = `select * from t_product where t_product_num = '${product.productNum}'`;

    const getProduct = await awaitSql(getProductQuery)
      .catch((err) => {
        maria.rollback();
        logger.error("😡 getProduct 중 SQL오류가 났어! -> " + err.message);
        return { err: err };
      })
      .then((result) => {
        return result;
      });

    if (!checkSql(getProduct)) {
      maria.rollback();
      logger.warn("😵‍💫 getProduct SQL에러 또는 변화된것이 없어!");
      return next(createError(403, "변화에 문제가 생겼습니다."));
    }

    const productPrice = getProduct[0].t_product_price * product.count;
    let tempPrice = productPrice;
    if (product.nomalCoupon) {
      const nomalCouponNum = product.nomalCoupon.couponNum;

      const getCouponQuery = `select * from coupon where coupon_num = '${nomalCouponNum}'`;
      const getCoupon = await awaitSql(getCouponQuery)
        .catch((err) => {
          maria.rollback();
          logger.error("😡 getCoupon 중 SQL오류가 났어! -> " + err.message);
          return { err: err };
        })
        .then((result) => {
          return result;
        });

      if (!checkSql(getCoupon)) {
        maria.rollback();
        logger.warn("😵‍💫 getCoupon SQL에러 또는 변화된것이 없어!");
        return next(createError(403, "변화에 문제가 생겼습니다."));
      }
      if (getCoupon.length === 0) {
        maria.rollback();
        logger.warn("😵‍💫 getUserCoupon 값이 없어!");
        return next(createError(403, "변화에 문제가 생겼습니다."));
      }

      if (getCoupon[0].coupon_discount_type === "RATE") {
        const disCountRatePrice =
          productPrice * (getCoupon[0].conpon_discount_rate * 0.01);
        const discount =
          getCoupon[0].coupon_max_discount < disCountRatePrice
            ? getCoupon[0].coupon_max_discount
            : disCountRatePrice;
        tempPrice -= discount;
      } else if (getCoupon[0].coupon_discount_type === "AMOUNT") {
        tempPrice -= getCoupon[0].coupon_discount;
      }
    }

    if (product.dualCoupon) {
      const dualCoupon = product.dualCoupon.couponNum;

      const getDualCouponQuery = `select * from coupon where coupon_num = '${dualCoupon}'`;
      const getDualCoupon = await awaitSql(getDualCouponQuery)
        .catch((err) => {
          maria.rollback();
          logger.error("😡 getCoupon 중 SQL오류가 났어! -> " + err.message);
          return { err: err };
        })
        .then((result) => {
          return result;
        });
      if (!checkSql(getDualCoupon)) {
        maria.rollback();
        logger.warn("😵‍💫 getCoupon SQL에러 또는 변화된것이 없어!");
        return next(createError(403, "변화에 문제가 생겼습니다."));
      }
      if (getDualCoupon.length === 0) {
        maria.rollback();
        logger.warn("😵‍💫 getUserCoupon 값이 없어!");
        return next(createError(403, "변화에 문제가 생겼습니다."));
      }
      // 중복쿠폰인지 확인
      if (!getDualCoupon[0].coupon_type === "DUAL") {
        maria.rollback();
        logger.error("😡 getDualCoupon 중복쿠폰이 아니야");
        return next(createError(403, "변화에 문제가 생겼습니다."));
      }
      // 중복쿠폰 계산

      if (getDualCoupon[0].coupon_discount_type === "RATE") {
        const disCountRatePrice =
          productPrice * (getDualCoupon[0].conpon_discount_rate * 0.01);
        const discount =
          getDualCoupon[0].coupon_max_discount < disCountRatePrice
            ? getDualCoupon[0].coupon_max_discount
            : disCountRatePrice;
        tempPrice -= discount;
      } else if (getDualCoupon[0].coupon_discount_type === "AMOUNT") {
        tempPrice -= getDualCoupon[0].coupon_discount;
      }
      //올리기
    }
    productPriceList.push(tempPrice);
  }
  req.body.productPriceList = productPriceList;
  return next();
};

module.exports = {
  orderCouponCheck,
  orderCouponCategoryCheck,
  totalCouponPrice,
};
