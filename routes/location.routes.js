import express from "express";
const router = express.Router();
import { addLocation, getLocation, deleteLocation } from "../controllers/location.controllers.js";  
// Route to add a new location
router.post("/add", addLocation);
router.get("/get", getLocation);
router.post("/delete", deleteLocation);

export default router;