import express from "express";
import {
  signup,
  login,
  getLoggedInUser
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * Register user
 * POST /api/auth/register
 */
router.post("/signup", signup);

/**
 * Login user
 * POST /api/auth/login
 */
router.post("/login", login);

/**
 * Get logged-in user profile
 * GET /api/auth/me
 */
router.get("/me", protect, getLoggedInUser);

export default router;
