const { checkReqBodyData } = require("../module/check");
const { createError } = require("../module/error");
const { awaitSql, checkSql } = require("../module/sqlPromise");

const createCart = async (req, res, next) => {
  if (!req.body.user) {
    return next(createError(400, "입력된 값이 없습니다."));
  }
  if (!checkReqBodyData(req, "productNum")) {
  }

  const userId = req.body.user;
  const productNum = req.body.data.productNum;

  const createCouponsQuery = `insert into cart(t_users_id, t_product_num, count) values('${userId}', ${productNum}, 1)`;

  const createCoupons = await awaitSql(createCouponsQuery)
    .catch((err) => {
      return { err: err };
    })
    .then((result) => {
      return result;
    });

  console.log(createCoupons);
  if (!checkSql(createCoupons)) {
    return next(createError(403, "변화에 문제가 생겼습니다."));
  }

  return res.send("create카트테스트");
};

const readCart = async (req, res, next) => {
  return res.send("read카트테스트");
};
const updateCart = async (req, res, next) => {
  return res.send("update카트테스트");
};
const deleteCart = async (req, res, next) => {
  return res.send("delete카트테스트");
};

module.exports = { createCart, readCart, updateCart, deleteCart };
