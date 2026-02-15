// models/Order.js
import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
    index: true, // helpful for product analytics
  },
  productName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true, // user order history
    },

    orderItems: [orderItemSchema],

    shippingAddress: {
      fullName: { type: String, required: true },
      phoneNumber: { type: String, required: true, index: true }, // search by phone
      email: { type: String, required: true, index: true }, // search by email
      address: { type: String, required: true },
      city: { type: String, required: true, index: true }, // filter by city
      state: { type: String, required: true, index: true }, // filter by state
      postalCode: { type: String, required: true },
      country: { type: String, required: true, default: "India" },
    },

    paymentMethod: {
      type: String,
      required: true,
      enum: ["COD", "UPI", "Card", "Net Banking"],
      index: true,
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Completed", "Failed", "Refunded"],
      default: "Pending",
      index: true, // filter pending payments
    },

    itemsPrice: {
      type: Number,
      required: true,
      default: 0,
    },

    taxPrice: {
      type: Number,
      required: true,
      default: 0,
    },

    shippingPrice: {
      type: Number,
      required: true,
      default: 0,
    },

    discountAmount: {
      type: Number,
      default: 0,
    },

    totalPrice: {
      type: Number,
      required: true,
      default: 0,
      index: true, // analytics & revenue sorting
    },

    orderStatus: {
      type: String,
      enum: [
        "Processing",
        "Shipped",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
      ],
      default: "Processing",
      index: true, // admin dashboard filter
    },

    deliveredAt: {
      type: Date,
      index: true,
    },

    paidAt: {
      type: Date,
      index: true,
    },
  },
  { timestamps: true }
);



// 🔥 COMPOUND INDEXES (Very Important)

// For user order history (sorted by latest)
orderSchema.index({ userId: 1, createdAt: -1 });

// For admin dashboard filtering
orderSchema.index({ orderStatus: 1, createdAt: -1 });

// For payment tracking
orderSchema.index({ paymentStatus: 1, createdAt: -1 });

// For sales analytics
orderSchema.index({ createdAt: -1 });

const Order = mongoose.model("Order", orderSchema);

export default Order;
