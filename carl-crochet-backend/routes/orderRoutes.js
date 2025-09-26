import express from "express";
import { createOrder, getOrders, getOrderById } from "../controllers/orderController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, createOrder);
router.get("/", getOrders);
router.get("/:id", getOrderById);

export default router;
