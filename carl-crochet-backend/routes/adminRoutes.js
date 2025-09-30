import express from "express";
import {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
  getOrders,
  updateOrderStatus,
} from "../controllers/adminController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Products
router.get("/products", verifyToken, getProducts);
router.post("/products", verifyToken, addProduct);
router.put("/products/:id", verifyToken, updateProduct);
router.delete("/products/:id", verifyToken, deleteProduct);

// Orders
router.get("/orders", verifyToken, getOrders);
router.put("/orders/:id/status", verifyToken, updateOrderStatus);

export default router;
