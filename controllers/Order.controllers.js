import Order from "../models/Order.models.js";
import Product  from "../models/Product.models.js";


// ==========================================
// ➕ Create Order
// ==========================================
export const createOrder = async (req, res) => {
  try {
    const {
      userId,
      orderItems,
      shippingAddress,
      paymentMethod,
      taxPrice = 0,
      shippingPrice = 0,
      discountAmount = 0,
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items provided" });
    }

    // Calculate items price
    let itemsPrice = 0;

    for (let item of orderItems) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${product.name}`,
        });
      }

      itemsPrice += product.price * item.quantity;

      // Reduce stock
      product.stock -= item.quantity;
      await product.save();
    }

    const totalPrice =
      itemsPrice + taxPrice + shippingPrice - discountAmount;

    const newOrder = new Order({
      userId,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      discountAmount,
      totalPrice,
    });

    await newOrder.save();

    res.status(201).json({
      message: "Order placed successfully ✅",
      order: newOrder,
    });
  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// ==========================================
// 📂 Get All Orders (Admin)
// ==========================================
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Get Orders Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// ==========================================
// 👤 Get User Orders
// ==========================================
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Get User Orders Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// ==========================================
// 🔍 Get Order By ID
// ==========================================
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ order });
  } catch (error) {
    console.error("Get Order Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// ==========================================
// ✏️ Update Order Status (Admin)
// ==========================================
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus, paymentStatus } = req.body;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (orderStatus) order.orderStatus = orderStatus;
    if (paymentStatus) order.paymentStatus = paymentStatus;

    if (orderStatus === "Delivered") {
      order.deliveredAt = Date.now();
    }

    if (paymentStatus === "Completed") {
      order.paidAt = Date.now();
    }

    await order.save();

    res.status(200).json({
      message: "Order updated successfully ✅",
      order,
    });
  } catch (error) {
    console.error("Update Order Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// ==========================================
// ❌ Delete Order (Admin)
// ==========================================
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await Order.findByIdAndDelete(id);

    res.status(200).json({ message: "Order deleted successfully ✅" });
  } catch (error) {
    console.error("Delete Order Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
