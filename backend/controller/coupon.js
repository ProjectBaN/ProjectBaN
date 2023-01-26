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

module.exports = {
  createCouponCategory,
  readCouponCategory,
  updateCouponCategory,
  deleteCouponCategory,
};
