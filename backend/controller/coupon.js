const { checkReqBodyData, checkCouponValied } = require("../module/check");
const { createError } = require("../module/error");
const { checkSql, awaitSql } = require("../module/sqlPromise");
const { successStatus } = require("../module/statuscode");

// 쿠폰 세일 카테고리 생성
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

  return res.send(successStatus({ success: true }));
};

// 쿠폰 세일 카테고리 read
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

// 업데이트 쿠폰 세일 카테고리
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

// 쿠폰카테고리 삭제
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

// 쿠폰카테고리 상품추가
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

// 쿠폰카테고리 상품들고오기
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

// 쿠폰카테고리 상품 삭제
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

// 쿠폰 발급 > 카테고리가 없으면 NULL이라는 카테고리로
const createCoupon = async (req, res, next) => {
  if (
    !checkReqBodyData(
      req,
      "couponName",
      "couponType",
      "couponDiscountType",
      "conponDiscountRate",
      "couponDiscount",
      "couponMaxDiscount",
      "couponValiedAt",
      "couponValiedEnd",
      "couponUseDate",
      "couponValiedCount"
    )
  ) {
    return next(createError(401, "값이없습니다."));
  }

  const couponName = req.body.data.couponName;
  const couponType = req.body.data.couponType;
  const couponDiscountType = req.body.data.couponDiscountType;
  const conponDiscountRate = req.body.data.conponDiscountRate;
  const couponDiscount = req.body.data.couponDiscount;
  const couponMaxDiscount = req.body.data.couponMaxDiscount;
  const couponValiedAt = req.body.data.couponValiedAt;
  const couponValiedEnd = req.body.data.couponValiedEnd;
  const couponUseDate = req.body.data.couponUseDate;
  const couponSaleCategoryName = req.body.data.couponSaleCategoryName;
  const couponValiedCount = req.body.data.couponValiedCount;
  if (
    couponType !== "ALL" &&
    couponType !== "DUAL" &&
    couponType !== "CATEGORY"
  ) {
    return next(createError(401, "잘못된 타입 입니다."));
  }

  if (couponDiscountType !== "RATE" && couponDiscountType !== "AMOUNT") {
    return next(createError(401, "잘못된 타입 입니다."));
  }

  const createCouponQuery = couponSaleCategoryName
    ? `insert into coupon(coupon_name,coupon_type,coupon_discount_type,conpon_discount_rate,coupon_discount,coupon_max_discount,coupon_valied_at,coupon_valied_end, coupon_valied_count, coupon_use_date, coupon_sale_category_name) values('${couponName}','${couponType}','${couponDiscountType}','${conponDiscountRate}','${couponDiscount}','${couponMaxDiscount}','${couponValiedAt}','${couponValiedEnd}', '${couponValiedCount}', '${couponUseDate}','${couponSaleCategoryName}')`
    : `insert into coupon(coupon_name,coupon_type,coupon_discount_type,conpon_discount_rate,coupon_discount,coupon_max_discount,coupon_valied_at,coupon_valied_end, coupon_valied_count, coupon_use_date, coupon_sale_category_name) values('${couponName}','${couponType}','${couponDiscountType}','${conponDiscountRate}','${couponDiscount}','${couponMaxDiscount}','${couponValiedAt}','${couponValiedEnd}', '${couponValiedCount}', '${couponUseDate}','NULL')`;

  const createCoupon = await awaitSql(createCouponQuery)
    .catch((err) => {
      return { err: err };
    })
    .then((result) => {
      return result;
    });
  console.log(createCoupon);

  if (!checkSql(createCoupon)) {
    return next(createError(403, "변화에 문제가 생겼습니다."));
  }

  return res.send("createCoupon");
};
// 현재 쿠폰 보기
const readCoupon = async (req, res, next) => {
  const readCouponQuery = `select * from coupon `;
  const readCoupon = await awaitSql(readCouponQuery)
    .catch((err) => {
      return { err: err };
    })
    .then((result) => {
      return result;
    });

  if (!checkSql(readCoupon)) {
    return next(createError(403, "변화에 문제가 생겼습니다."));
  }

  return res.send(successStatus(readCoupon));
};
//  쿠폰수정
const updateCoupon = async (req, res, next) => {
  if (
    !checkReqBodyData(
      req,
      "couponNum",
      "couponName",
      "couponType",
      "couponDiscountType",
      "conponDiscountRate",
      "couponDiscount",
      "couponMaxDiscount",
      "couponValiedAt",
      "couponValiedEnd"
    )
  ) {
    return next(createError(401, "값이없습니다."));
  }

  const couponNum = req.body.data.couponNum;
  const couponName = req.body.data.couponName;
  const couponType = req.body.data.couponType;
  const couponDiscountType = req.body.data.couponDiscountType;
  const conponDiscountRate = req.body.data.conponDiscountRate;
  const couponDiscount = req.body.data.couponDiscount;
  const couponMaxDiscount = req.body.data.couponMaxDiscount;
  const couponValiedAt = req.body.data.couponValiedAt;
  const couponValiedEnd = req.body.data.couponValiedEnd;

  if (
    couponType !== "ALL" &&
    couponType !== "DUAL" &&
    couponType !== "CATEGORY"
  ) {
    return next(createError(401, "잘못된 타입 입니다."));
  }

  if (couponDiscountType !== "RATE" && couponDiscountType !== "AMOUNT") {
    return next(createError(401, "잘못된 타입 입니다."));
  }

  const updateCouponQuery = `update coupon set coupon_name = '${couponName}',coupon_type ='${couponType}',coupon_discount_type='${couponDiscountType}',conpon_discount_rate='${conponDiscountRate}',coupon_discount='${couponDiscount}',coupon_max_discount='${couponMaxDiscount}',coupon_valied_at='${couponValiedAt}',coupon_valied_end='${couponValiedEnd}' where coupon_num='${couponNum}'`;
  const updateCoupon = await awaitSql(updateCouponQuery)
    .catch((err) => {
      return { err: err };
    })
    .then((result) => {
      return result;
    });

  if (!checkSql(updateCoupon)) {
    return next(createError(403, "변화에 문제가 생겼습니다."));
  }

  res.send("hello");
};
//  쿠폰삭제
const deleteCoupon = async (req, res, next) => {
  if (!checkReqBodyData(req, "couponNum")) {
    return next(createError(401, "값이없습니다."));
  }
  const couponNum = req.body.data.couponNum;

  const deleteCouponQuery = `delete from coupon where coupon_num = '${couponNum}' `;
  const deleteCoupon = await awaitSql(deleteCouponQuery)
    .catch((err) => {
      return { err: err };
    })
    .then((result) => {
      return result;
    });

  if (!checkSql(deleteCoupon)) {
    return next(createError(403, "변화에 문제가 생겼습니다."));
  }

  return res.send(successStatus({ success: true }));
};

// 유저 쿠폰 생성
const createUserCoupons = async (req, res, next) => {
  if (!req.body.user || !req.body.couponResult) {
    return next(createError(400, "입력된 값이 없습니다."));
  }
  const coupon = req.body.couponResult;
  const userId = req.body.user;

  // 쿠폰 발급가능 횟수 확인
  const couponValiedCount = coupon[0].coupon_valied_count;
  const getUserCouponQuery = `select count(*) from coupon_users where t_users_id = '${userId}' and coupon_num = '${coupon[0].coupon_num}'`;
  const getUserCoupon = await awaitSql(getUserCouponQuery)
    .catch((err) => {
      return { err: err };
    })
    .then((result) => {
      return result;
    });

  if (!checkSql(getUserCoupon)) {
    return next(createError(403, "변화에 문제가 생겼습니다."));
  }
  if (getUserCoupon[0]["count(*)"] >= couponValiedCount) {
    return next(createError(501, "발급제한을 초과하였습니다."));
  }

  // 통과되면 유저에게 발급 > db에 관계추가
  const useDate = "NOW() + INTERVAL " + coupon[0].coupon_use_date + " DAY";
  const createUserCouponQuery = `insert into coupon_users(coupon_num, t_users_id, coupon_users_valied_end) values('${coupon[0].coupon_num}','${userId}',${useDate})`;
  const createUserCoupon = await awaitSql(createUserCouponQuery)
    .catch((err) => {
      return { err: err };
    })
    .then((result) => {
      return result;
    });
  console.log(createUserCoupon);
  if (!checkSql(createUserCoupon)) {
    return next(createError(403, "변화에 문제가 생겼습니다."));
  }

  return res.send("넘김");
};

// 사용가능한 쿠폰들
const useAbleCoupons = async (req, res, next) => {
  if (!req.body.user) {
    return next(createError(400, "입력된 값이 없습니다."));
  }
  if (!checkReqBodyData(req, "productNum")) {
    return next(createError(401, "값이없습니다."));
  }

  const userId = req.body.user;
  const productnum = req.body.data.productNum;
  // 프로덕트의 세일카테고리를 얻는다.
  const getProductCategoryQuery = `select coupon_sale_category from coupon_sale_category_product where t_product_num = ${productnum}`;
  const getProductCategory = await awaitSql(getProductCategoryQuery)
    .catch((err) => {
      return { err: err };
    })
    .then((result) => {
      return result;
    });

  if (!checkSql(getProductCategory)) {
    return next(createError(403, "변화에 문제가 생겼습니다."));
  }
  // 유저가 가진 쿠폰 가져오기
  const readCouponsQuery = `select * from coupon_users as cu join coupon as c on cu.coupon_num = c.coupon_num where t_users_id = '${userId}'`;
  const readCoupons = await awaitSql(readCouponsQuery)
    .catch((err) => {
      return { err: err };
    })
    .then((result) => {
      return result;
    });

  if (!checkSql(readCoupons)) {
    return next(createError(403, "변화에 문제가 생겼습니다."));
  }
  // 쿠폰중 ALL,DUAL은 뽑고, 쿠폰의 세일카테고리와 물품의 세일카테고리가 같으면 출력 , 필요한 쿠폰정보 뽑기
  const useCoupons = readCoupons.filter((coupons) => {
    // 쿠폰유효기간 확인
    if (!checkCouponValied(coupons.coupon_users_valied_end)) {
      return;
    }
    // ALL, DUAL은 그냥 출력
    if (coupons.coupon_type === "ALL" || coupons.coupon_type === "DUAL") {
      return coupons;
    }
    //  카테고리는 세일카테고리가 같으면 출력
    if (coupons.coupon_type === "CATEGORY") {
      const equlsCategory = getProductCategory.filter((category) => {
        if (
          category.coupon_sale_category === coupons.coupon_sale_category_name
        ) {
          return category;
        } else return;
      });

      if (equlsCategory.length !== 0) {
        return coupons;
      }
    }
  });
  return res.send(useCoupons);
};

// 유저가 가진 쿠폰들
const readUserCoupons = async (req, res, next) => {
  if (!req.body.user) {
    return next(createError(400, "입력된 값이 없습니다."));
  }

  const userId = req.body.user;

  const readCouponsQuery = `select * from coupon_users as cu join coupon as c on cu.coupon_num = c.coupon_num where t_users_id = '${userId}'`;
  const readCoupons = await awaitSql(readCouponsQuery)
    .catch((err) => {
      return { err: err };
    })
    .then((result) => {
      return result;
    });

  if (!checkSql(readCoupons)) {
    return next(createError(403, "변화에 문제가 생겼습니다."));
  }

  // 쿠폰중 ALL,DUAL은 뽑고, 쿠폰의 세일카테고리와 물품의 세일카테고리가 같으면 출력 , 필요한 쿠폰정보 뽑기
  const useCoupons = readCoupons.filter((coupons) => {
    // 쿠폰유효기간 확인
    if (!checkCouponValied(coupons.coupon_users_valied_end)) {
      return;
    }

    //  사용했는지 체크
    if (coupons.coupon_status === "Y") {
      return;
    }
    return coupons;
  });
  return res.send(successStatus(useCoupons));
};

// 만료된 쿠폰들 삭제
const deleteUserConpons = async (req, res, next) => {
  if (!req.body.user) {
    return next(createError(400, "입력된 값이 없습니다."));
  }
  const userId = req.body.user;

  const deleteUserConponsQuery = `delete from coupon_users where t_users_id = '${userId}' and coupon_users_valied_end < now()`;
  const deleteUserConpons = await awaitSql(deleteUserConponsQuery)
    .catch((err) => {
      return { err: err };
    })
    .then((result) => {
      return result;
    });

  if (!checkSql(deleteUserConpons)) {
    return next(createError(403, "변화에 문제가 생겼습니다."));
  }

  return next();
};

module.exports = {
  createCouponCategory,
  readCouponCategory,
  updateCouponCategory,
  deleteCouponCategory,
  createConponCategoryProduct,
  readCouponCategoryProduct,
  deleteCouponCategoryProduct,
  createCoupon,
  readCoupon,
  updateCoupon,
  deleteCoupon,
  createUserCoupons,
  useAbleCoupons,
  readUserCoupons,
  deleteUserConpons,
};
