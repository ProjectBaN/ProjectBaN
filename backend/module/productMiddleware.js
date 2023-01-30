const { checkReqBodyData } = require("./check");
const { createError } = require("./error");
const { awaitSql, checkSql } = require("./sqlPromise");

// 재고갯수 체크
const checkProductStock = async (req, res, next) => {
  if (!checkReqBodyData(req, "productNum", "count")) {
    return next(createError(400, "입력된 값이 없습니다."));
  }
  const count = req.body.data.count;
  const productNum = req.body.data.productNum;

  const getProductQuery = `select * from t_product where t_product_num = '${productNum}'`;
  const getProduct = await awaitSql(getProductQuery)
    .catch((err) => {
      return { err: err };
    })
    .then((result) => {
      return result;
    });

  if (!checkSql(getProduct)) {
    return next(createError(403, "변화에 문제가 생겼습니다."));
  }
  if (getProduct[0].t_product_stock < count) {
    return next(createError(403, "재고가 수량보다 적습니다."));
  } else {
    next();
  }
};
module.exports = { checkProductStock };
