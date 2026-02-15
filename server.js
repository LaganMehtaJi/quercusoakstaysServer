import express from "express";
import ConnectDB from "./config/db.js";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

// Routes
import offerRoutes from "./routes/Offer.routes.js";
import locationRoutes from "./routes/location.routes.js";   // SAME
import ImagesRoutes from "./routes/AddImages.routes.js";    // SAME
import productRoutes from "./routes/Product.routes.js";
import queryRoutes from "./routes/Query.routes.js";
import orderRoutes from "./routes/Order.routes.js";

const app = express();

dotenv.config();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================
// API Routes
// ============================

app.use("/api/offers", offerRoutes);

app.use("/api", locationRoutes);        // SAME
app.use("/api", ImagesRoutes);          // SAME

app.use("/api/products", productRoutes);

app.use("/api/queries", queryRoutes);

app.use("/api/orders", orderRoutes);

// ============================
// Connect DB & Start Server
// ============================

ConnectDB();

app.listen(process.env.PORT, (error) => {
  if (error) {
    console.log(`Error: ${error}`);
  } else {
    console.log(`Server running on port ${process.env.PORT} 🚀`);
  }
});
``