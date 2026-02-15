import mongoose from "mongoose";

const offerSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },

    discountPercentage: {
      type: Number,
      required: true,
      min: 1,
      max: 100,
    },

    maxDiscountAmount: {
      type: Number,
      min: 0,
      default: 0, // Optional cap on discount
    },

    minimumOrderAmount: {
      type: Number,
      min: 0,
      default: 0,
    },

    usageLimit: {
      type: Number,
      min: 1,
      default: 1, // How many times total it can be used
    },

    usedCount: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    expiryDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Offer = mongoose.model("Offer", offerSchema);

export default Offer;
