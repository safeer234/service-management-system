import express from "express";
import {
  getAvailableRequests,
  acceptServiceRequest,
  getMyRequests,
  completeService,
  getProviderEarnings,
  getProviderDashboard
} from "../controllers/providerController.js";

import { protect } from "../middleware/authMiddleware.js";
import { isProvider } from "../middleware/roleMiddleware.js";

const router = express.Router();

/**
 * Get available service requests for provider
 * GET /api/provider/requests
 */
router.get(
  "/requests",
  protect,
  isProvider,
  getAvailableRequests
);

/**
 * Accept a service request
 * PUT /api/provider/request/:id/accept
 */
router.put(
  "/request/:id/accept",
  protect,
  isProvider,
  acceptServiceRequest
);

/**
 * Get provider's assigned requests
 * GET /api/provider/my-requests
 */
router.get(
  "/my-requests",
  protect,
  isProvider,
  getMyRequests
);

/**
 * Mark service as completed
 * PUT /api/provider/request/:id/complete
 */
router.put(
  "/request/:id/complete",
  protect,
  isProvider,
  completeService
);

/**
 * Get provider earnings
 * GET /api/provider/earnings
 */
router.get(
  "/earnings",
  protect,
  isProvider,
  getProviderEarnings
);

router.get("/dashboard", protect, isProvider, getProviderDashboard);

export default router;
