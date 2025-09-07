// models/Booking.js
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    propertyId: { type: mongoose.Schema.Types.ObjectId, required: true },
    propertyName: { type: String, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    guests: { type: Number, required: true },
    contactNumber: { type: String, required: true },
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    specialRequests: { type: String },
    paymentMethod: { type: String, required: true },
    baseAmount: { type: Number, required: true },
    tax: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    nights: { type: Number, required: true },
    bookingDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export  const Booking = mongoose.model("Booking", bookingSchema);
