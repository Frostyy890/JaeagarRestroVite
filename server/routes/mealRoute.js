import express from "express";
import { createMeal, getAllMeals } from "../controllers/mealControllers.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/meals", verifyToken, createMeal);
router.get("/meals", verifyToken, getAllMeals);

export { router as mealRouter };
