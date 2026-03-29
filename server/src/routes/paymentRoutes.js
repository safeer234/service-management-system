import express from "express";
import {
  createPayment,
  getPaymentByRequest,
  markPaymentAsPaid,
  getAllPayments,
  fakePayment
} from "../controllers/paymentController.js";

import { protect } from "../middleware/authMiddleware.js";
import { isAdmin, isClient } from "../middleware/roleMiddleware.js";

const router = express.Router();

/**
 * Create payment record
 */
router.post("/create", createPayment);

/**
 * Fake payment for project demo
 */
router.post("/fake-pay", protect, isClient, fakePayment);

/**
 * Get payment details
 */
router.get(
  "/request/:requestId",
  isClient,
  isAdmin,
  protect,
  getPaymentByRequest
);

/**
 * Mark payment as paid
 */
router.put(
  "/:id/pay",
  protect,
  isAdmin,
  markPaymentAsPaid
);

/**
 * Get all payments
 */
router.get(
  "/",
  protect,
  isAdmin,
  getAllPayments
);


router.post("/create-order", protect, createRazorpayOrder);
router.post("/verify", protect, verifyPayment);

export default router;