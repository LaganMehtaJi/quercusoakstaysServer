import express from "express";
const router = express.Router();
import * as enquiryController from "../controllers/enquery.controllers.js";

router.post("/add", enquiryController.AddEnqurey);
router.post("/delete", enquiryController.DeleteEnqurey);
router.get("/get", enquiryController.GetEnqurey);

export default router;
