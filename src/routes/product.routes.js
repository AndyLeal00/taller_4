const express = require("express");
const verifyToken = require("../middlewares/auth.middleware");

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require("../controllers/product.controller");

const router = express.Router();

router.post("/", verifyToken, createProduct);
router.get("/", verifyToken, getProducts);
router.get("/:id", verifyToken, getProductById);
router.put("/:id", verifyToken, updateProduct);
router.delete("/:id", verifyToken, deleteProduct);

module.exports = router;
