import express from "express";
import ConnectDB from "./config/db.js";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import enquiryRoutes from "./routes/enquire.routes.js";
import locationRoutes from "./routes/location.routes.js";
import userRoutes from "./routes/user.routes.js";
import listRoutes from "./routes/list.routes.js";
import propertyRoutes from "./routes/property.routes.js";
const app = express();

dotenv.config();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/enquiry", enquiryRoutes);
app.use("/api/location",locationRoutes);
app.use("/api/user",userRoutes);
app.use("/api/list",listRoutes);
app.use("/api/property",propertyRoutes);

ConnectDB();
app.listen(process.env.PORT,(error)=>{
    if(error){
     console.log(`Error : ${error}`);
    }else{
    console.log(`Server Listen Port no : ${process.env.PORT}`);
    }
});
