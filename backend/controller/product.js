const { awaitSql } = require("../module/sqlPromise");
const maria = require("../database/maria");
const { createSqlError, createError } = require("../module/error");

require("dotenv").config();

const writeProduct = async (req, res, next) => {
  // **쇼핑글**

  // 데이터 받아서 처리
  const productWriteQuery = `insert into t_product_write(t_product_write_category, t_product_write_title, t_product_write_desc, t_product_write_image) values ('네일', '크리스마스네일', '네일작성 테스트','')`;

  const insertProductWrite = await awaitSql(productWriteQuery)
    .catch((err) => {
      return { err: err };
    })
    .then((result) => {
      return result;
    });
  console.log(insertProductWrite);

  // 카테고리
  // 상품이름
  // 상품설명
  // 상품 이미지

  // **상품등록**

  // 옵션: 이름, 가격,재고,할인율
  //[ 옵션1,옵션2,옵션3...] 리스트 돌려서 실행 안되면 try와 return
};

module.exports = { writeProduct };
