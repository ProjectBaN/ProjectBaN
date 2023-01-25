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

module.exports = router;
