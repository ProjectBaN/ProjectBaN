const express = require("express");
const {
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
  deleteAnswer,
  updateAnswer,
} = require("../controller/product");
const { verifyAccessToken } = require("../module/verify");
const router = express.Router();

// 상품생성
router.post("/create", createProductWrite);
// 상품수정
router.post("/update", updateProductWrite);
// 상품삭제
router.post("/delete", deleteProductWrite);
// 조회수증가
router.get("/hitsup", hitsUp);
// 카테고리 추가
router.post("/insertcategory", insertCategory);
// 카테고리 수정
router.post("/updatecategory", updateCategory);
// 카테고리 삭제
router.post("/deletecategory", deleteCategory);
// 로그인후> qna작성
router.post("/createqna", verifyAccessToken, createQna);
// 로그인후 qna 삭제
router.post("/deleteqna", verifyAccessToken, deleteQna);
// 관리자
// qna 답장 생성
router.post("/createanswer", createAnswer);
//qna 답장 삭제
router.post("/deleteanswer", deleteAnswer);
// qna 답장 수정
router.post("/updateanswer", updateAnswer);

module.exports = router;
