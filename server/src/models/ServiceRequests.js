import mongoose from "mongoose";

const serviceRequestsSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true
    },

    // 👇 NEW FIELD (IMPORTANT)
    category: {
      type: String,
      required: true,
      trim: true,
      index: true
    },

    // 👇 Keep this only for display
    serviceType: {
      type: String,
      required: true,
      trim: true
    },

    serviceAddress: {
      type: String,
      required: true,
      trim: true
    },

    preferredDate: {
      type: Date,
      required: true
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "completed", "cancelled"],
      default: "pending",
      index: true
    },

    estimatedPrice: {
      type: Number,
      required: true
    },

    description: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

// 🔥 Compound Index (VERY IMPORTANT FOR PERFORMANCE)
serviceRequestsSchema.index({
  status: 1,
  category: 1,
  provider: 1
});

const ServiceRequests = mongoose.model(
  "ServiceRequests",
  serviceRequestsSchema
);

export default ServiceRequests;