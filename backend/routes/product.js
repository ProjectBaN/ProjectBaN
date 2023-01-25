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
} = require("../controller/product");
const { verifyAccessToken } = require("../module/verify");
const router = express.Router();

router.post("/create", createProductWrite);
router.post("/update", updateProductWrite);
router.post("/delete", deleteProductWrite);

router.get("/hitsup", hitsUp);

router.post("/insertcategory", insertCategory);
router.post("/updatecategory", updateCategory);
router.post("/deletecategory", deleteCategory);

router.post("/createqna", verifyAccessToken, createQna);
router.post("/deleteqna", verifyAccessToken, deleteQna);
// 관리자
router.post("/createanswer", createAnswer);

module.exports = router;
