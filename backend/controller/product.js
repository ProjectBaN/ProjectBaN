const { awaitSql } = require("../module/sqlPromise");
const maria = require("../database/maria");
const { createSqlError, createError } = require("../module/error");
const { successStatus } = require("../module/statuscode");
const { checkReqBodyData } = require("../module/check");

require("dotenv").config();

// 이미지 서버 로직 추가
/** 쇼핑글 등록**/
const createProductWrite = async (req, res, next) => {
  // 값없을 시 || 문 처리 밑 에러 핸들링
  if (
    !checkReqBodyData(
      req,
      "category",
      "title",
      "desc",
      "thumbnail",
      "mainImage",
      "optionList",
      "productImageList"
    )
  ) {
    return next(createError(401, "값이없습니다."));
  }

  const category = req.body.data.category;
  const title = req.body.data.title;
  const desc = req.body.data.desc;
  const thumbnail = req.body.data.thumbnail || [];
  const mainImage = req.body.data.mainImage || [];

  const optionList = req.body.data.optionList || [];

  const productImageList = req.body.data.productImageList || [];

  maria.beginTransaction(async (err) => {
    if (err) return next(createError(500, err));

    // **쇼핑글**

    const productWriteQuery = `insert into t_product_write(t_product_write_category, t_product_write_title, t_product_write_desc, t_product_write_thumbnail, t_product_write_main_image) values ('${category}', '${title}', '${desc}', '${thumbnail}', '${mainImage}')`;

    const insertProductWrite = await awaitSql(productWriteQuery)
      .catch((err) => {
        return { err: err };
      })
      .then((result) => {
        return result;
      });

    if (insertProductWrite.err) {
      maria.rollback();
      return next(createSqlError(insertProductWrite.err));
    }

    // **상품등록**
    let optionQuaryCheck = {};

    const writeNum = insertProductWrite.insertId;

    for (const optiion of optionList) {
      const optionQuery = `insert into t_product(t_product_name,t_product_write_num, t_product_price, t_product_stock, t_product_thumbnail, t_product_discount) values('${optiion.name}', '${writeNum}', '${optiion.price}', '${optiion.stock}', '${optiion.thumbnail}', '${optiion.discount}')`;
      const insertOption = await awaitSql(optionQuery)
        .catch((err) => ({
          err: err,
        }))
        .then((result) => {
          return result;
        });

      if (insertOption.err) {
        optionQuaryCheck = insertOption;
        break;
      }
    }

    if (optionQuaryCheck.err) {
      maria.rollback();
      return next(createSqlError(optionQuaryCheck.err));
    }

    // **쇼핑글 제품 이미지 등록**
    let imageQueryCheck = {};

    for (const productImage of productImageList) {
      const optionQuery = `insert into t_product_write_product_image(t_product_write_num, t_product_write_product_img, t_product_write_product_img_desc) values('${writeNum}', '${productImage.img}', '${productImage.desc}')`;
      const insertImage = await awaitSql(optionQuery)
        .catch((err) => ({
          err: err,
        }))
        .then((result) => {
          return result;
        });

      if (insertImage.err) {
        imageQueryCheck = insertImage;
        break;
      }
    }

    if (imageQueryCheck.err) {
      maria.rollback();
      return next(createSqlError(imageQueryCheck.err));
    }

    if (
      !imageQueryCheck.err &&
      !optionQuaryCheck.err &&
      !insertProductWrite.err
    ) {
      maria.commit();
      res.send(successStatus({ susccess: "성공" }));
    }
  });
};
// **쇼핑글 업데이트**

const updateProductWrite = async (req, res, next) => {
  if (
    !checkReqBodyData(
      req,
      "productWriteNumber",
      "category",
      "title",
      "desc",
      "thumbnail",
      "mainImage",
      "optionList",
      "productImageList"
    )
  ) {
    return next(createError(401, "값이없습니다."));
  }

  const productWriteNumber = req.body.data.productWriteNumber;
  const category = req.body.data.category;
  const title = req.body.data.title;
  const desc = req.body.data.desc;
  const thumbnail = req.body.data.thumbnail || [];
  const mainImage = req.body.data.mainImage || [];
  const optionList = req.body.data.optionList || [];
  const productImageList = req.body.data.productImageList || [];

  // 전체적 트랜잭션
  console.log(productWriteNumber);
  // 쇼핑글 있는지 체크
  const checkNumberQuery = `select * from t_product_write where t_product_write_number = '${productWriteNumber}'`;
  const checkProductWriteNumber = await awaitSql(checkNumberQuery)
    .catch((err) => {
      return { err: err };
    })
    .then((result) => {
      return result;
    });
  if (checkProductWriteNumber.err) {
    return next(createSqlError(checkProductWriteNumber.err));
  }
  if (checkProductWriteNumber.length === 0) {
    return next(createError(403, "쇼핑 글이 존재하지 않습니다."));
  }

  // 쇼핑글은 업데이트를 하고

  // 옵션 상품은 기존에꺼 삭제후 다시 등록

  // 이미지 또한 기존에꺼 삭제후 다시 등록

  res.send("hello");
};

// **쇼핑글지우기**
// 이미지 서버 로직추가
const deleteProductWrite = async (req, res, next) => {
  if (!checkReqBodyData(req, "productWriteNumber")) {
    return next(createError(401, "값이없습니다."));
  }

  const productWriteNumber = req.body.data.productWriteNumber;

  const query = `DELETE FROM t_product_write WHERE t_product_write_number = '${productWriteNumber}'`;

  const deleteProductWrite = await awaitSql(query)
    .catch((err) => {
      return { err: err };
    })
    .then((result) => {
      return result;
    });

  if (deleteProductWrite.err) {
    return next(createSqlError(deleteProductWrite.err));
  }

  res.send(deleteProductWrite);
};
// **조회수 증가**
const hitsUp = async (req, res, next) => {
  if (!req.query || !req.query.product_write_number) {
    return next(createError(401, "상품번호가없습니다."));
  }
  const product_write_number = req.query.product_write_number;
  const hitsUpQuery = `update t_product_write set t_product_write_hits=t_product_write_hits+1 where t_product_write_number=${product_write_number}`;
  const hitsUp = await awaitSql(hitsUpQuery)
    .catch((err) => {
      return { err: err };
    })
    .then((result) => {
      return result;
    });

  if (hitsUp.err) {
    return next(createError(501, "조회수증가에서문제가생겼습니다."));
  }
  return res.send(successStatus({ success: "조회수증가성공" }));
};

module.exports = {
  createProductWrite,
  hitsUp,
  deleteProductWrite,
  updateProductWrite,
};
