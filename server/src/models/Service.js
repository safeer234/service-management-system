import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Plumbing",
        "Electrical",
        "Cleaning",
        "Painting",
        "Carpentry",
        "AC Repair",
        "Other",
      ],
      index: true
    },

    price: {
      type: Number,
      required: true,
      index: true
    },

    image: {
      type: String,
      required: true,
    },

    isPopular: {
      type: Boolean,
      default: false,
      index: true
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true
    },
  },
  {
    timestamps: true,
  }
);

// 🔥 Compound index for fast filtering
serviceSchema.index({
  category: 1,
  isActive: 1,
  isPopular: 1
});

const Service = mongoose.model("Service", serviceSchema);

export default Service;