import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import { createOrder, getOrders, updateOrder } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", verifyToken, createOrder);

router.get("/", verifyToken, getOrders);

router.put("/:id", verifyToken, updateOrder);

export default router;
