import express from "express";
import {
  createServiceRequest,
  getMyServiceRequests,
  cancelServiceRequest
} from "../controllers/clientController.js";

import { protect } from "../middleware/authMiddleware.js";
import { isClient } from "../middleware/roleMiddleware.js";

const router = express.Router();

/**
 * Create a service request
 * POST /api/client/request
 */
router.post("/request", protect, isClient, createServiceRequest);

/**
 * Get logged-in client's service requests
 * GET /api/client/requests
 */
router.get("/requests", protect, isClient, getMyServiceRequests);

/**
 * Cancel a service request
 * PUT /api/client/request/:id/cancel
 */
router.delete("/request/:id", protect, isClient, cancelServiceRequest);

export default router;
