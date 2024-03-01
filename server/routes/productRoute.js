import express from "express";
import { createProduct, deleteProduct, getAllProduct, getProductById } from "../controllers/productController.js";

const router = express.Router();

router.post("/", createProduct);

router.get("/:id", getProductById);

router.get("/", getAllProduct);

router.delete("/:id", deleteProduct);

export default router;
