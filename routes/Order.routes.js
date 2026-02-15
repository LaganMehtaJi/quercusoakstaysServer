import express from "express";
const router = express.Router();

import * as orderController from "../controllers/Order.controllers.js";

// =============================
// Create Order (Place Order)
// =============================
router.post("/create", orderController.createOrder);

// =============================
// Get Logged-in User Orders
// =============================
router.get("/my-orders/:userId", orderController.getUserOrders);

// =============================
// Get All Orders (Admin)
// =============================
router.get("/", orderController.getAllOrders);

// =============================
// Get Single Order
// =============================
router.get("/:id", orderController.getOrderById);

// =============================
// Update Order Status (Admin)
// =============================
router.put("/update-status/:id", orderController.updateOrderStatus);

// =============================
// Delete Order (Admin)
// =============================
router.delete("/delete/:id", orderController.deleteOrder);

export default router;
