import express from "express";
import { listOrders, placeOrder, verifyOrder, updateStatus, userOrder } from "../controllers/orderController.js";
import { authMiddleware } from "../middleware/auth.js";

export const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", authMiddleware, verifyOrder);
orderRouter.post("/userorders", authMiddleware, userOrder);
orderRouter.get("/list", listOrders);
orderRouter.post("/status", updateStatus);