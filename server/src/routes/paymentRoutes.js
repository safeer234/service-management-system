import express from "express";
import {
   createPayment,
  getPaymentByRequest,
  markPaymentAsPaid,
  getAllPayments
} from "../controllers/paymentController.js";

import { protect } from "../middleware/authMiddleware.js";
import { isAdmin, isClient } from "../middleware/roleMiddleware.js";

const router = express.Router();

/**
 * Get payment details for a service request
 * GET /api/payment/request/:requestId
 * Accessible by Client or Admin
 */



router.post("/create", createPayment);

router.get(
  "/request/:requestId",
  isClient,
  isAdmin,
  protect,
  getPaymentByRequest
);

/**
 * Mark payment as paid
 * PUT /api/payment/:id/pay
 * Admin only
 */
router.put(
  "/:id/pay",
  protect,
  isAdmin,
  markPaymentAsPaid
);

/**
 * Get all payments
 * GET /api/payment
 * Admin only
 */
router.get(
  "/",
  protect,
  isAdmin,
  getAllPayments
);

export default router;
