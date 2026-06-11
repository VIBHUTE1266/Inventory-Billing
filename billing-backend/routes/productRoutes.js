const express = require("express");
const router = express.Router();

const {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getProductsByCategory,
  getLowStock,
  updateProductStock
} = require("../controllers/productController");

router.get("/", getProducts);
router.get("/search", searchProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/low-stock", getLowStock);
router.get("/:id", getProduct);
router.post("/", addProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.patch("/:id/stock", updateProductStock);

module.exports = router;