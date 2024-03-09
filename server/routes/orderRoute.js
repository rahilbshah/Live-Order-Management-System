import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import { createOrder, deleteAllOrders, getOrders, updateOrder } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", verifyToken, createOrder);

router.get("/", verifyToken, getOrders);

router.put("/:id", verifyToken, updateOrder);

router.delete("/", verifyToken, deleteAllOrders);

export default router;
