import express from "express";
import { placeOrder } from "../controllers/orderControllers.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/orders", verifyToken, placeOrder);

export { router as orderRouter };
