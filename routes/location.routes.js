import express from "express";
import upload from "../utils/multerConfig.js";
import * as LocationController from "../controllers/location.controllers.js";

const router = express.Router();

router.post("/locations/add", upload.single("image"), LocationController.AddLocation);
router.get("/locations/get", LocationController.GetAllLocations);
router.delete("/locations/delete/:name", LocationController.DeleteLocation);
export default router;
