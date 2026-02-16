import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
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
    },

    price: {
      type: Number,
      required: true,
    },

    image: {
      type: String, // store image URL (Cloudinary / static)
      required: true,
    },

    isPopular: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model("Service", serviceSchema);

export default Service;
