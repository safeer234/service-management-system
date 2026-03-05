import Payment from "../models/Payment.js";
import ServiceRequest from "../models/ServiceRequests.js";

/**
 * Create payment
 */
export const createPayment = async (req, res) => {
  try {
    const { serviceRequestId, amount } = req.body;

    const request = await ServiceRequest.findById(serviceRequestId);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Service request not found"
      });
    }

    const existingPayment = await Payment.findOne({
      serviceRequest: serviceRequestId
    });

    if (existingPayment) {
      return res.status(400).json({
        success: false,
        message: "Payment already created for this request"
      });
    }

    const payment = await Payment.create({
      serviceRequest: serviceRequestId,
      client: request.client,
      provider: request.provider,
      amount,
      status: "pending"
    });

    res.status(201).json({
      success: true,
      message: "Payment created successfully",
      data: payment
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to create payment"
    });
  }
};

/**
 * Get payment by request
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
 * Mark payment as paid
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
 * Get all payments
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

/**
 * 🔥 NEW FAKE PAYMENT METHOD (for demo projects)
 */
export const fakePayment = async (req, res) => {
  try {
    const { serviceRequestId, amount } = req.body;

    const payment = await Payment.findOne({
      serviceRequest: serviceRequestId
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment record not found"
      });
    }

    payment.status = "paid";
    payment.paidAt = new Date();

    await payment.save();

    await ServiceRequest.findByIdAndUpdate(
      serviceRequestId,
      { status: "completed" }
    );

    res.status(200).json({
      success: true,
      message: "Payment successful (Demo Mode)"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Payment failed"
    });
  }
};