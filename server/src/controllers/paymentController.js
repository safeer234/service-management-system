import Payment from "../models/Payment.js";
import ServiceRequest from "../models/ServiceRequests.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import PDFDocument from "pdfkit";
import sendInvoiceEmail from "../utils/sendInvoiceEmail.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

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



export const createRazorpayOrder = async (req, res) => {
  try {
    const { serviceRequestId } = req.body;

    const request = await ServiceRequest.findById(serviceRequestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    const amount = request.estimatedPrice * 100; // paise

    const options = {
      amount,
      currency: "INR",
      receipt: `receipt_${serviceRequestId}`
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      order
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Order creation failed" });
  }
};


import nodemailer from "nodemailer";

const sendInvoiceEmail = async (email, pdfBuffer) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: `"ServiceHub" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your Service Invoice",
    text: "Thank you for your payment. Please find your invoice attached.",
    attachments: [
      {
        filename: "invoice.pdf",
        content: pdfBuffer
      }
    ]
  });
};


export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      serviceRequestId
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    // ✅ Update payment
    const payment = await Payment.findOneAndUpdate(
      { serviceRequest: serviceRequestId },
      {
        status: "paid",
        paidAt: new Date(),
        paymentId: razorpay_payment_id
      },
      { new: true, upsert: true }
    ).populate("client").populate("serviceRequest");

    await ServiceRequest.findByIdAndUpdate(
      serviceRequestId,
      { status: "completed" }
    );

    // =========================
    // 🧾 GENERATE PDF
    // =========================
    const doc = new PDFDocument();
    const buffers = [];

    doc.on("data", buffers.push.bind(buffers));

    doc.on("end", async () => {
      const pdfBuffer = Buffer.concat(buffers);

      // =========================
      // 📩 SEND EMAIL
      // =========================
      await sendInvoiceEmail(payment.client.email, pdfBuffer);
    });

    doc.fontSize(20).text("ServiceHub Invoice", { align: "center" });

    doc.moveDown();
    doc.text(`Invoice ID: ${payment._id}`);
    doc.text(`Payment ID: ${razorpay_payment_id}`);
    doc.text(`Date: ${new Date().toLocaleDateString()}`);

    doc.moveDown();
    doc.text(`Customer: ${payment.client.username}`);
    doc.text(`Email: ${payment.client.email}`);

    doc.moveDown();
    doc.text(`Service: ${payment.serviceRequest.serviceType}`);
    doc.text(`Amount: ₹${payment.amount}`);

    doc.moveDown();
    doc.text("Thank you for your payment!", { align: "center" });

    doc.end();

    res.json({ success: true });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Verification failed" });
  }
};