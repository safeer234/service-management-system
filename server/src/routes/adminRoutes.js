import express from "express";
import {
  getAdminDashboard,
  getAllProviders,
  updateProviderStatus,
  getAllServiceRequests
} from "../controllers/adminController.js";

import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

/**
 * Admin Dashboard
 * GET /api/admin/dashboard
 */
router.get("/dashboard", protect, isAdmin, getAdminDashboard);

/**
 * Get all providers (for verification)
 * GET /api/admin/providers
 */
router.get("/providers", protect, isAdmin, getAllProviders);

/**
 * Approve / Reject provider
 * PUT /api/admin/providers/:id
 */
router.put("/providers/:id", protect, isAdmin, updateProviderStatus);

/**
 * Get all service requests
 * GET /api/admin/requests
 */
router.get("/requests", protect, isAdmin, getAllServiceRequests);

export default router;
