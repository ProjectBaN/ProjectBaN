const { checkReqBodyData } = require("../module/check");
const { createError } = require("../module/error");
const { checkSql, awaitSql } = require("../module/sqlPromise");
const { successStatus } = require("../module/statuscode");

const createCouponCategory = async (req, res, next) => {
  if (!checkReqBodyData(req, "categoryName")) {
    return next(createError(401, "값이없습니다."));
  }
  const categoryName = req.body.data.categoryName;

  const createCategoryQuery = `insert into coupon_sale_category(coupon_sale_category_name) values('${categoryName}')`;
  const createCategory = await awaitSql(createCategoryQuery)
    .catch((err) => {
      return { err: err };
    })
    .then((result) => {
      return result;
    });

  if (!checkSql(createCategory)) {
    return next(createError(403, "변화에 문제가 생겼습니다."));
  }

  return res.send("createcategory");
};

const readCouponCategory = async (req, res, next) => {
  const readCategoryQuery = `select coupon_sale_category_name from coupon_sale_category `;
  const readCategory = await awaitSql(readCategoryQuery)
    .catch((err) => {
      return { err: err };
    })
    .then((result) => {
      return result;
    });

  const result = { data: readCategory };

  if (!checkSql(readCategory)) {
    return next(createError(403, "변화에 문제가 생겼습니다."));
  }
  return res.send(successStatus(result));
};

const updateCouponCategory = async (req, res, next) => {
  if (!checkReqBodyData(req, "categoryName", "updateCategoryName")) {
    return next(createError(401, "값이없습니다."));
  }
  const categoryName = req.body.data.categoryName;
  const updateCategoryName = req.body.data.updateCategoryName;

  const updateCategoryQuery = `update coupon_sale_category set coupon_sale_category_name = '${updateCategoryName}' where coupon_sale_category_name = '${categoryName}'`;
  const updateCategory = await awaitSql(updateCategoryQuery)
    .catch((err) => {
      return { err: err };
    })
    .then((result) => {
      return result;
    });

  if (!checkSql(updateCategory)) {
    return next(createError(403, "변화에 문제가 생겼습니다."));
  }

  return res.send(successStatus({ success: true }));
};

const deleteCouponCategory = async (req, res, next) => {
  if (!checkReqBodyData(req, "deleteCategoryName")) {
    return next(createError(401, "값이없습니다."));
  }
  const deleteCategoryName = req.body.data.deleteCategoryName;

  const deleteCategoryQuery = `delete from coupon_sale_category where coupon_sale_category_name = '${deleteCategoryName}'`;
  const deleteCategory = await awaitSql(deleteCategoryQuery)
    .catch((err) => {
      return { err: err };
    })
    .then((result) => {
      return result;
    });

  if (!checkSql(deleteCategory)) {
    return next(createError(403, "변화에 문제가 생겼습니다."));
  }

  return res.send(successStatus({ success: true }));
};

const createConponCategoryProduct = async (req, res, next) => {
  if (!checkReqBodyData(req, "categoryName", "productNum")) {
    return next(createError(401, "값이없습니다."));
  }
  const categoryName = req.body.data.categoryName;
  const productNum = req.body.data.productNum;

  const createCategoryQuery = `insert into coupon_sale_category_product(t_product_num,coupon_sale_category) values('${productNum}','${categoryName}')`;
  const createCategory = await awaitSql(createCategoryQuery)
    .catch((err) => {
      return { err: err };
    })
    .then((result) => {
      return result;
    });

  if (!checkSql(createCategory)) {
    return next(createError(403, "변화에 문제가 생겼습니다."));
  }

  return res.send(successStatus({ success: true }));
};

const readCouponCategoryProduct = async (req, res, next) => {
  if (!checkReqBodyData(req, "categoryName")) {
    return next(createError(401, "값이없습니다."));
  }
  const categoryName = req.body.data.categoryName;

  const readCouponCategoryProductQuery = `select t_product_write_num, t_product_name, t_product_price, t_product_stock, t_product_thumbnail, t_product_discount, t_product_sell, t_product_create_at, t_product_update_at from coupon_sale_category_product as cp join t_product as p on p.t_product_num = cp.t_product_num where coupon_sale_category = '${categoryName}'`;
  const readCouponCategoryProduct = await awaitSql(
    readCouponCategoryProductQuery
  )
    .catch((err) => {
      return { err: err };
    })
    .then((result) => {
      return result;
    });

  if (!checkSql(readCouponCategoryProduct)) {
    return next(createError(403, "변화에 문제가 생겼습니다."));
  }

  return res.send(successStatus(readCouponCategoryProduct));
};

const deleteCouponCategoryProduct = async (req, res, next) => {
  if (!checkReqBodyData(req, "categoryName", "productNum")) {
    return next(createError(401, "값이없습니다."));
  }
  const categoryName = req.body.data.categoryName;
  const productNum = req.body.data.productNum;

  const deleteCouponCategoryProductQuery = `delete from coupon_sale_category_product where coupon_sale_category = '${categoryName}' and t_product_num = '${productNum}'`;
  const deleteCouponCategoryProduct = await awaitSql(
    deleteCouponCategoryProductQuery
  )
    .catch((err) => {
      return { err: err };
    })
    .then((result) => {
      return result;
    });

  if (!checkSql(deleteCouponCategoryProduct)) {
    return next(createError(403, "변화에 문제가 생겼습니다."));
  }

  return res.send(successStatus({ success: true }));
};

module.exports = {
  createCouponCategory,
  readCouponCategory,
  updateCouponCategory,
  deleteCouponCategory,
  createConponCategoryProduct,
  readCouponCategoryProduct,
  deleteCouponCategoryProduct,
};
