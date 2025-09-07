// controllers/bookingController.js
import {Booking} from "../models/book.models.js";
import nodemailer from "nodemailer";

export const createBooking = async (req, res) => {
  try {
    // Save booking in DB
    const booking = new Booking(req.body);
    await booking.save();

    // Setup Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER, // your gmail
        pass: process.env.MAIL_PASS, // your app password
      },
    });

    // Email Content
    const mailOptions = {
      from: process.env.MAIL_USER,
      to: booking.email, // Send mail to user
      subject: `Booking Confirmation - ${booking.propertyName}`,
      html: `
        <h2>Dear ${booking.firstName} ${booking.lastName},</h2>
        <p>Thank you for your interest in <b>${booking.propertyName}</b>.</p>
        <p>Your booking details are as follows:</p>
        <ul>
          <li><b>Property:</b> ${booking.propertyName}</li>
          <li><b>Check-In:</b> ${new Date(booking.checkIn).toDateString()}</li>
          <li><b>Check-Out:</b> ${new Date(booking.checkOut).toDateString()}</li>
          <li><b>Guests:</b> ${booking.guests}</li>
          <li><b>Special Requests:</b> ${booking.specialRequests || "None"}</li>
          <li><b>Payment Method:</b> ${booking.paymentMethod}</li>
          <li><b>Total Amount:</b> ₹${booking.totalAmount}</li>
        </ul>
        <p>We will contact you shortly at <b>${booking.contactNumber}</b>.</p>
        <br>
        <p>Regards,<br>Quercus Oak Stays Team</p>
      `,
    };

    // Send Email
    await transporter.sendMail(mailOptions);

    res.status(201).json({
      message: "Booking created successfully and email sent",
      booking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Booking failed" });
  }
};
