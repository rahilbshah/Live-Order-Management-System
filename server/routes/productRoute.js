import express from "express";
import { createProduct, getAllProduct, getProductById } from "../controllers/productController.js";

const router = express.Router();

router.post("/", createProduct);

router.get("/:id", getProductById);

router.get("/", getAllProduct);


export default router;
