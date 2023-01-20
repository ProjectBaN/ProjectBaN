const { awaitSql } = require("../module/sqlPromise");
const maria = require("../database/maria");
const { createSqlError, createError } = require("../module/error");
const { successStatus } = require("../module/statuscode");
const { checkReqBodyData } = require("../module/check");

require("dotenv").config();

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

const hitsUp = async (req, res, next) => {
  res;
};

module.exports = { createProductWrite, hitsUp };
