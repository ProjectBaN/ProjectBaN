const { checkReqBodyData } = require("./check");
const { createError } = require("./error");
const { awaitSql, checkSql } = require("./sqlPromise");

const cartDuplicateCheck = async (req, res, next) => {
  if (!req.body.user) {
    return next(createError(400, "입력된 값이 없습니다."));
  }
  if (!checkReqBodyData(req, "productNum")) {
    return next(createError(400, "입력된 값이 없습니다."));
  }
  const userId = req.body.user;
  const productNum = req.body.data.productNum;

  const getCartQuery = `select * from cart where t_users_id = '${userId}' and t_product_num='${productNum}'`;
  const getCart = await awaitSql(getCartQuery)
    .catch((err) => {
      return { err: err };
    })
    .then((result) => {
      return result;
    });

  if (!checkSql(getCart)) {
    return next(createError(403, "변화에 문제가 생겼습니다."));
  }
  if (getCart.length > 0) {
    return res.send(createError(403, "이미 장바구니에 있는 물품 입니다!"));
  } else {
    return next();
  }
};

module.exports = { cartDuplicateCheck };
