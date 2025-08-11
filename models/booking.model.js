import mongoose from "mongoose";
import { Property } from "../models/property.models.js";

const { Schema } = mongoose;

const BookingSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true
  }
}, { timestamps: true });

export const Booking = mongoose.model("Booking", BookingSchema);
