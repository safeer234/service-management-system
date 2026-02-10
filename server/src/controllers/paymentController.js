import Payment from "../models/Payment.js";
import ServiceRequest from "../models/ServiceRequests.js";

/**
 * @desc   Get payment details for a service request
 * @route  GET /api/payment/:requestId
 */
export const getPaymentByRequest = async (req, res) => {
  try {
    const payment = await Payment.findOne({
      serviceRequest: req.params.requestId
    })
      .populate("client", "name email")
      .populate("provider", "name email");

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment record not found"
      });
    }

    res.status(200).json({
      success: true,
      data: payment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch payment details"
    });
  }
};

/**
 * @desc   Mark payment as paid
 * @route  PUT /api/payment/:id/pay
 */
export const markPaymentAsPaid = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found"
      });
    }

    payment.status = "paid";
    payment.paidAt = new Date();

    await payment.save();

    // Optional: update service request status
    await ServiceRequest.findByIdAndUpdate(
      payment.serviceRequest,
      { status: "completed" }
    );

    res.status(200).json({
      success: true,
      message: "Payment marked as paid successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update payment status"
    });
  }
};

/**
 * @desc   Get all payments (Admin use)
 * @route  GET /api/payment
 */
export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("client", "name email")
      .populate("provider", "name email")
      .populate("serviceRequest");

    res.status(200).json({
      success: true,
      data: payments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch payments"
    });
  }
};
