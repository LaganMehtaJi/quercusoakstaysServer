import express from "express";
import * as bookControllers from  "../controllers/booking.controller.js";
const router = express.Router();

router.get("/get",bookControllers.getAllBookingsWithProperty);
router.post("/add",bookControllers.bookBooking);

export default router;