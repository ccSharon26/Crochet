import express from "express";
import {
  getProducts,
  addProduct,
  deleteProduct,
  updateProductStock,
  updateProductSizes,
  getOrders,
  updateOrderStatus
} from "../controllers/adminController.js";

const router = express.Router();

// ===== Products =====
router.get("/products", getProducts);
router.post("/products", addProduct);
router.delete("/products/:id", deleteProduct);
router.put("/products/:id/stock", updateProductStock);
router.put("/products/:id/sizes", updateProductSizes);

// ===== Orders =====
router.get("/orders", getOrders);
router.put("/orders/:id", updateOrderStatus);

export default router;
