import express from "express";
import { askChatbot } from "../controllers/chatbotController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔐 Protected route (user must be logged in)
router.post("/ask", protect, askChatbot);

export default router;