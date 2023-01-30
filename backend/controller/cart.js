const { checkReqBodyData } = require("../module/check");
const { createError } = require("../module/error");
const { awaitSql, checkSql } = require("../module/sqlPromise");
const { successStatus } = require("../module/statuscode");

const createCart = async (req, res, next) => {
  if (!req.body.user) {
    return next(createError(400, "입력된 값이 없습니다."));
  }
  if (!checkReqBodyData(req, "productNum", "count")) {
    return next(createError(400, "입력된 값이 없습니다."));
  }

  const userId = req.body.user;
  const productNum = req.body.data.productNum;

  const createCouponsQuery = `insert into cart(t_users_id, t_product_num, count) values('${userId}', '${productNum}','${count}' )`;

  const createCoupons = await awaitSql(createCouponsQuery)
    .catch((err) => {
      return { err: err };
    })
    .then((result) => {
      return result;
    });

  if (!checkSql(createCoupons)) {
    return next(createError(403, "변화에 문제가 생겼습니다."));
  }

  return res.send(successStatus({ success: true }));
};

const readCart = async (req, res, next) => {
  if (!req.body.user) {
    return next(createError(400, "입력된 값이 없습니다."));
  }

  const userId = req.body.user;

  const getCartQuery = `select * from cart where t_users_id = '${userId}' `;
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

  return res.send(successStatus(getCart));
};
const updateCart = async (req, res, next) => {
  if (!req.body.user) {
    return next(createError(403, "입력된 값이 없습니다."));
  }

  if (!checkReqBodyData(req, "productNum", "count")) {
  }

  if (req.body.data.count <= 0) {
    return next(createError(403, "입력된 값이 없습니다."));
  }

  const userId = req.body.user;
  const productNum = req.body.data.productNum;
  const count = req.body.data.count;

  const updateCouponsQuery = `update cart set count = '${count}' where t_users_id = '${userId}' and t_product_num ='${productNum}'`;

  const updateCoupons = await awaitSql(updateCouponsQuery)
    .catch((err) => {
      return { err: err };
    })
    .then((result) => {
      return result;
    });

  if (!checkSql(updateCoupons)) {
    return next(createError(403, "변화에 문제가 생겼습니다."));
  }

  return res.send("update카트테스트");
};
const deleteCart = async (req, res, next) => {
  if (!req.body.user) {
    return next(createError(400, "입력된 값이 없습니다."));
  }
  if (!checkReqBodyData(req, "productNum")) {
    return next(createError(400, "입력된 값이 없습니다."));
  }

  const userId = req.body.user;
  const productNum = req.body.data.productNum;

  const deleteCartQuery = `delete from cart where t_users_id = '${userId}' and t_product_num ='${productNum}'`;

  const deleteCart = await awaitSql(deleteCartQuery)
    .catch((err) => {
      return { err: err };
    })
    .then((result) => {
      return result;
    });

  if (!checkSql(deleteCart)) {
    return next(createError(403, "변화에 문제가 생겼습니다."));
  }
  return res.send(successStatus({ success: true }));
};

module.exports = { createCart, readCart, updateCart, deleteCart };
