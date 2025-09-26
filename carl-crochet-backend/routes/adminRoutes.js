import express from "express";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ===== PRODUCTS ===== */
// Get all products
router.get("/products", verifyToken, async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error("Get products error:", err);
    res.status(500).json({ message: err.message });
  }
});

// Add a new product
router.post("/products", verifyToken, async (req, res) => {
  try {
    const { name, price, image } = req.body;
    const product = new Product({ name, price, image });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error("Add product error:", err);
    res.status(400).json({ message: err.message });
  }
});

/* ===== ORDERS ===== */
// Update order status
router.put("/orders/:id", verifyToken, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();
    res.json(order);
  } catch (err) {
    console.error("Update order status error:", err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
