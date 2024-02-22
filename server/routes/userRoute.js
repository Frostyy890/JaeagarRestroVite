import express from "express";
import { getUserById, saveUserItems } from "../controllers/userControllers.js";

const router = express.Router();
router.get("/:userId", getUserById);
router.post("/:userId/cartItems", saveUserItems);
export { router as userRouter };
