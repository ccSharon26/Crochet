import express from "express";
import { createOrder, getOrders, getOrderById } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/", getOrders);       // ✅ no email required
router.get("/:id", getOrderById);

export default router;
