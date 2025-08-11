import express from "express";
import * as  bookingmodels  from "../models/booking.model.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
export const bookBooking = async (req, res) => {
  try {
    const booking = await bookingmodels.Booking.create(req.body);
    console.log(booking);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: booking.email,
      subject: "Booking Confirmation",
      text: `Hello ${booking.name},\n\nYour booking has been confirmed for property ID: ${booking.propertyId}.\n\nThank you!`
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: "Booking created and email sent successfully", booking });
  } catch (error) {
    res.status(500).json({ message: "Failed to create booking", error: error.message });
  }
};

export const getAllBookingsWithProperty = async (req, res) => {
  try {
    const bookings = await bookingmodels.Booking.find().populate("propertyId");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve bookings", error: error.message });
  }
};