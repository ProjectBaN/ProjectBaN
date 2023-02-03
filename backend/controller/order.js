const { logger } = require("../config/logger");
const { checkReqBodyData } = require("../module/check");
const { createError } = require("../module/error");
const { awaitSql, checkSql } = require("../module/sqlPromise");

const orderTest = async (req, res, next) => {
  return res.send("order");
};

const orderProductPrice = async (req, res, next) => {
  if (!checkReqBodyData(req, "productList")) {
    logger.warn("😵‍💫 들어온 데이터 값이 부족해...");

    return next(createError(401, "값이없습니다."));
  }
  const productList = req.body.data.productList;
  if (!Array.isArray(productList) || productList.length === 0) {
    logger.warn("😵‍💫 잘못된 물품 리스트야...");
    return next(createError(401, "잘못된 리스트입니다."));
  }

  const totalPrice = [];

  for (const orderProduct of productList) {
    // 상품정보
    const getProductQuery = `select * from t_product where t_product_num=${orderProduct.productNum} `;
    const getProduct = await awaitSql(getProductQuery)
      .catch((err) => {
        logger.error(
          "😡 프로덕트를 가져오는 중 SQL오류가 났어! -> " + err.message
        );
        return { err: err };
      })
      .then((result) => {
        return result;
      });

    if (!checkSql(getProduct)) {
      logger.warn("😵‍💫 SQL에러 또는 변화된것이 없어!");
      return next(createError(403, "변화에 문제가 생겼습니다."));
    }

    if (getProduct.length === 0) {
      logger.warn("😵‍💫 찾는 물품이 없어..");
      return next(createError(403, "물품이 없어"));
    }
    const getCouponQuery = `select * from coupon_users as cu join coupon as c on cu.coupon_num = c.coupon_num where cu.coupon_num ='${orderProduct.couponNum}' and cu.coupon_status = 'N' and cu.coupon_users_valied_end > now()`;
    const getCoupon = await awaitSql(getCouponQuery)
      .catch((err) => {
        logger.error(
          "😡 프로덕트를 가져오는 중 SQL오류가 났어! -> " + err.message
        );
        return { err: err };
      })
      .then((result) => {
        return result;
      });

    if (!checkSql(getCoupon)) {
      logger.warn("😵‍💫 SQL에러 또는 변화된것이 없어!");
      return next(createError(403, "변화에 문제가 생겼습니다."));
    }

    if (getCoupon.length === 0) {
      logger.warn("😵‍💫 찾는 쿠폰이 없어..");
      return next(createError(403, "물품이 없어"));
    }

    // 카테고리 쿠폰이라면 한번 더 확인
    if (getCoupon[0].coupon_type === "CATEGORY") {
      const checkProductSaleCategoryQuery = `select * from coupon_sale_category_product where t_product_num = '${orderProduct.productNum}' and coupon_sale_category = '${getCoupon[0].coupon_sale_category_name}'`;
      const checkProductSaleCategory = await awaitSql(
        checkProductSaleCategoryQuery
      )
        .catch((err) => {
          logger.error(
            "😡 상품 세일카테고리 확인 중 SQL오류가 났어! -> " + err.message
          );
          return { err: err };
        })
        .then((result) => {
          return result;
        });

      if (!checkSql(checkProductSaleCategory)) {
        logger.warn("😵‍💫 SQL에러 또는 변화된것이 없어!");
        return next(createError(403, "변화에 문제가 생겼습니다."));
      }
      if (checkProductSaleCategory.length === 0) {
        logger.warn("😵‍💫 해당하는 카테고리가 없어");
        return next(createError(403, "쿠폰 카테고리가 잘못되었습니다."));
      }
    }
  }

  return res.send("종료");
};

// 주문서 작성내용 [주문 물품 들]
//  주문물품들 해체 -> 주문물품의 가격을 산정

module.exports = { orderTest, orderProductPrice };
