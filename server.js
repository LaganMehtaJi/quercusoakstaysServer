import express from "express";
import ConnectDB from "./config/db.js";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import offerRoutes from "./routes/offer.routes.js";
import locationRoutes from "./routes/location.routes.js";
import ImagesRoutes from "./routes/AddImages.routes.js";
import  PropertyRoutes  from "./routes/property.routes.js";
import addUserRoutes from "./routes/add.routes.js";
import bookingNowRoutes from "./routes/booking.routes.js";
const app = express();

dotenv.config();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/offer",offerRoutes);
app.use("/api",locationRoutes);
app.use("/api",ImagesRoutes);
app.use("/api/property",PropertyRoutes);
app.use("/api/phone",addUserRoutes);


ConnectDB();
app.listen(process.env.PORT,(error)=>{
    if(error){
     console.log(`Error : ${error}`);
    }else{
    console.log(`Server Listen Port no : ${process.env.PORT}`);
    }
});
