const express = require("express");
const {
  createProductWrite,
  hitsUp,
  deleteProductWrite,
  updateProductWrite,
} = require("../controller/product");
const router = express.Router();

router.post("/create", createProductWrite);
router.post("/update", updateProductWrite);
router.post("/delete", deleteProductWrite);
router.get("/hitsup", hitsUp);
module.exports = router;
