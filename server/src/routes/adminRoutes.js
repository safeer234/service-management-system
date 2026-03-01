import express from "express";
import {
  getAdminDashboard,
  getAllProviders,
  updateProviderStatus,
  getAllServiceRequests,
  getAllUsers,
  deleteUser,
  cancelServiceRequest,
   getPendingProviders,
    approveProvider,
    rejectProvider

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


router.get("/users", protect, isAdmin, getAllUsers);

router.delete("/request/:id", protect, isAdmin, cancelServiceRequest);


router.delete("/users/:id", protect, isAdmin, deleteUser);


router.get(
  "/providers/pending",
  protect,
  isAdmin,
  getPendingProviders
);

router.put(
  "/provider/approve/:id",
  protect,
  isAdmin,
  approveProvider
);

router.put(
  "/provider/reject/:id",
  protect,
  isAdmin,
  rejectProvider
);

export default router;
