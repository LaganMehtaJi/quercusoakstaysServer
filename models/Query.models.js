import mongoose from "mongoose";

const querySchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },

    relatedProduct: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },

    status: {
      type: String,
      enum: ["New", "In Progress", "Resolved"],
      default: "New",
    },
  },
  { timestamps: true }
);

const Query = mongoose.model("Query", querySchema);

export default Query;