import express from "express";
import rateLimit from "express-rate-limit";
import { aiChat, getRecommendations } from "../controllers/aiController.js";
import { authMiddleware } from "../middleware/auth.js";

export const aiRouter = express.Router();

const limiter = rateLimit({ windowMs: 60 * 1000, max: 15 });

aiRouter.post("/chat", authMiddleware, limiter, aiChat);
aiRouter.post("/recommend", authMiddleware, limiter, getRecommendations);