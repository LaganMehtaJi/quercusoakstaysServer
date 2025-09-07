// routes/bookingRoutes.js
import express from "express";
import * as booki  from "../controllers/booking.controllers.js";

const router = express.Router();

// POST /api/bookings
router.post("/now", booki.createBooking);

export default router;
