import express from "express";
import { getAllCategories } from "../controllers/categoryControllers.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.get("/categories", verifyToken, getAllCategories);

export { router as categoryRouter };
