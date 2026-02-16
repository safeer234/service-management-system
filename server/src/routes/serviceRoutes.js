import express from "express";
import {
  createService,
  getAllServices,
  getPopularServices,
  getSingleService,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";

import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

/**
 * PUBLIC ROUTES
 */

// Get all active services
router.get("/", getAllServices);

// Get popular services
router.get("/popular", getPopularServices);

// Get single service
router.get("/:id", getSingleService);


/**
 * ADMIN ROUTES (Protected)
 */

// Create service
router.post("/", protect, isAdmin, createService);

// Update service
router.put("/:id", protect, isAdmin, updateService);

// Delete service (soft delete)
router.delete("/:id", protect, isAdmin, deleteService);

export default router;
