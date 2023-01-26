const { awaitSql, checkSql } = require("../module/sqlPromise");
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

  maria.beginTransaction(async (err) => {
    if (err) return next(createError(500, err));

    // 전체적 트랜잭션
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
      maria.rollback();
      return next(createSqlError(checkProductWriteNumber.err));
    }
    if (checkProductWriteNumber.length === 0) {
      maria.rollback();
      return next(createError(403, "쇼핑 글이 존재하지 않습니다."));
    }

    // 쇼핑글은 업데이트를 하고
    const updateProductWriteQuery = `update t_product_write set t_product_write_category= '${category}' , t_product_write_title = '${title}', t_product_write_desc = '${desc}', t_product_write_thumbnail = '${thumbnail}', t_product_write_main_image = '${mainImage}' where t_product_write_number = '${productWriteNumber}'`;
    const updateProductWrite = await awaitSql(updateProductWriteQuery)
      .catch((err) => ({ err: err }))
      .then((result) => {
        return result;
      });
    if (updateProductWrite.err) {
      maria.rollback();
      return next(createSqlError(updateProductWrite.err));
    }

    // 옵션 상품은 기존에꺼 삭제후 다시 등록
    const deleteOptionQuery = `DELETE FROM t_product WHERE t_product_write_num = '${productWriteNumber}'`;
    const deleteOption = await awaitSql(deleteOptionQuery)
      .catch((err) => ({ err: err }))
      .then((result) => {
        return result;
      });

    if (deleteOption.err) {
      maria.rollback();
      return next(createSqlError(deleteOption.err));
    }

    let optionQuaryCheck = {};

    const writeNum = productWriteNumber;

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

    // 이미지 또한 기존에꺼 삭제후 다시 등록
    const deleteProductImageQuery = `DELETE FROM t_product_write_product_image WHERE t_product_write_num = '${productWriteNumber}'`;
    const deleteProductImage = await awaitSql(deleteProductImageQuery)
      .catch((err) => ({
        err: err,
      }))
      .then((result) => {
        return result;
      });

    if (deleteProductImage.err) {
      maria.rollback();
      return next(createSqlError(optionQuaryCheck.err));
    }

    // **쇼핑글 제품 이미지 등록**
    let imageQueryCheck = {};

    for (const productImage of productImageList) {
      const optionQuery = `insert into t_product_write_product_image(t_product_write_num, t_product_write_product_img, t_product_write_product_img_desc) values('${productWriteNumber}', '${productImage.img}', '${productImage.desc}')`;
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
      !checkProductWriteNumber.err &&
      !updateProductWrite.err &&
      !deleteOption.err &&
      !optionQuaryCheck.err &&
      !deleteProductImage.err &&
      !imageQueryCheck.err
    ) {
      maria.commit();
      return res.send(successStatus({ successStatus: "success" }));
    }
  });
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
// **카테고리 추가**
const insertCategory = async (req, res, next) => {
  if (!checkReqBodyData(req, "categoryName")) {
    return next(createError(401, "값이없습니다."));
  }
  const categoryName = req.body.data.categoryName;

  const insertCategoryQuery = `insert into t_product_write_category(t_product_write_category_name) values('${categoryName}')`;

  const insertCategory = await awaitSql(insertCategoryQuery)
    .catch((err) => {
      return { err: err };
    })
    .then((result) => {
      return result;
    });

  if (insertCategory.err) {
    return next(createSqlError(insertCategory.err));
  }

  return res.send(successStatus({ successStatus: true }));
};
// ** 카테고리 수정**
const updateCategory = async (req, res, next) => {
  if (!checkReqBodyData(req, "categoryName", "updateCategoryName")) {
    return next(createError(401, "값이없습니다."));
  }
  const categoryName = req.body.data.categoryName;
  const updateName = req.body.data.updateCategoryName;

  const updateCategoryQuery = `update t_product_write_category set t_product_write_category_name = '${updateName}' where t_product_write_category_name = '${categoryName}'`;
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
  return res.send(successStatus({ successStatus: true }));
};

// ** 카테고리 삭제**
const deleteCategory = async (req, res, next) => {
  if (!checkReqBodyData(req, "categoryName")) {
    return next(createError(401, "값이없습니다."));
  }
  const categoryName = req.body.data.categoryName;
  const deleteCategoryQuery = `delete from t_product_write_category where t_product_write_category_name = '${categoryName}'`;
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

  return res.send(successStatus({ successStatus: true }));
};

// ** qna 추가 **
const createQna = async (req, res, next) => {
  if (
    !checkReqBodyData(req, "category", "title", "contents", "productWriteNum")
  ) {
    return next(createError(401, "값이없습니다."));
  }
  if (!req.body.user) {
    return next(createError(401, "값이없습니다."));
  }
  // 외부키로 강제성 여부 추가
  if (
    req.body.data.category !== "배송" &&
    req.body.data.category !== "상품" &&
    req.body.data.category !== "기타"
  ) {
    return next(createError(403, "잘못된 값입니다."));
  }

  const usersId = req.body.user;
  const category = req.body.data.category;
  const title = req.body.data.title;
  const contents = req.body.data.contents;
  const productWriteNum = req.body.data.productWriteNum;

  const insertQnaQuery = `insert into product_qna(product_qna_category, product_qna_title, product_qna_contents, t_users_id, t_product_write_number) values('${category}','${title}','${contents}','${usersId}','${productWriteNum}')`;
  const insertQna = await awaitSql(insertQnaQuery)
    .catch((err) => {
      return { err: err };
    })
    .then((result) => {
      return result;
    });

  if (!checkSql(insertQna)) {
    return next(createError(403, "변화에 문제가 생겼습니다."));
  }

  res.send(successStatus({ successStatus: true }));
};

// **qna삭제**
const deleteQna = async (req, res, next) => {
  if (!req.body.user) {
    return next(createError(401, "값이없습니다."));
  }

  if (!checkReqBodyData(req, "qnaNum")) {
    return next(createError(401, "값이없습니다."));
  }

  const qnaNum = req.body.data.qnaNum;
  const user = req.body.user;

  const checkQnaIdQuery = `select * from product_qna where product_qna_num = '${qnaNum}'`;
  const checkQnaId = await awaitSql(checkQnaIdQuery)
    .catch((err) => {
      return { err: err };
    })
    .then((result) => {
      return result;
    });

  if (!checkSql(checkQnaId)) {
    return next(createError(403, "변화에 문제가 생겼습니다."));
  }

  if (checkQnaId[0].t_users_id !== user) {
    return next(createError(403, "권한이 없습니다."));
  }

  const deleteQnaQuery = `delete from product_qna where t_users_id = '${user}' AND product_qna_num = '${qnaNum}'`;
  const deleteQna = await awaitSql(deleteQnaQuery)
    .catch((err) => {
      return { err: err };
    })
    .then((result) => {
      return result;
    });

  if (!checkSql(deleteQna)) {
    return next(createError(403, "변화에 문제가 생겼습니다."));
  }

  return res.send(successStatus({ successStatus: true }));
};

// **qna대답** 대답했는지 안했는지 쿼리 추가 확인
const createAnswer = async (req, res, next) => {
  if (!checkReqBodyData(req, "qnaNum", "contents")) {
    return next(createError(401, "값이없습니다."));
  }

  const qnaNum = req.body.data.qnaNum;
  const contents = req.body.data.contents;

  const CreateAnswerQuery = `insert into product_qna_answer(product_qna_num, product_qna_answer_contents) values('${qnaNum}','${contents}')`;
  const CreateAnswer = await awaitSql(CreateAnswerQuery)
    .catch((err) => {
      return { err: err };
    })
    .then((result) => {
      return result;
    });

  if (!checkSql(CreateAnswer)) {
    maria.rollback();
    return next(createError(403, "변화에 문제가 생겼습니다."));
  }

  return res.send(successStatus({ successStatus: true }));
};

// ** 대답삭제**
const deleteAnswer = async (req, res, next) => {
  if (!checkReqBodyData(req, "answerNum")) {
    return next(createError(401, "값이없습니다."));
  }
  const answerNum = req.body.data.answerNum;

  const deleteAnswerQuery = `delete from product_qna_answer where product_qna_answer_num = ${answerNum}`;
  const deleteAnswer = await awaitSql(deleteAnswerQuery)
    .catch((err) => {
      return { err: err };
    })
    .then((result) => {
      return result;
    });

  if (!checkSql(deleteAnswer)) {
    return next(createError(403, "변화에 문제가 생겼습니다."));
  }

  res.send(successStatus({ successStatus: true }));
};

// ** 대답수정** 추후 회의로 생각
const updateAnswer = async (req, res, next) => {
  if (!checkReqBodyData(req, "answerNum", "contents")) {
    return next(createError(401, "값이없습니다."));
  }
  const answerNum = req.body.data.answerNum;
  const contents = req.body.data.contents;

  const updateAnswerQuery = `update product_qna_answer set product_qna_answer_contents = '${contents}' where product_qna_answer_num = '${answerNum}'`;
  const updateAnswer = await awaitSql(updateAnswerQuery)
    .catch((err) => {
      return { err: err };
    })
    .then((result) => {
      return result;
    });

  if (!checkSql(updateAnswer)) {
    return next(createError(403, "변화에 문제가 생겼습니다."));
  }
  res.send("hellow");
};

module.exports = {
  createProductWrite,
  hitsUp,
  deleteProductWrite,
  updateProductWrite,
  insertCategory,
  updateCategory,
  deleteCategory,
  createQna,
  deleteQna,
  createAnswer,
  updateAnswer,
  deleteAnswer,
};
