import mongoose from "mongoose";

const providerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    services: {
      type: [String],
      required: true,
    },

    serviceArea: {
      type: String,
      required: true,
      trim: true,
    },

    verificationStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    availability: {
      type: Boolean,
      default: true,   // ✅ better than required:true
    },

    experience: {
      type: Number,
      default: 0,
    },

    rating: {
      type: Number,
      default: 0,
    },

    completedJobs: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Provider", providerSchema);