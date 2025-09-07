import express from "express";
const router = express.Router();
import * as AddController from "../controllers/add.controllers.js";
router.post("/add-phone", AddController.AddPhone);
router.get("/get-all-phone", AddController.GetAllPhone);
router.delete("/delete-phone/:id", AddController.DeletePhone);
export default router;  