import express from "express";

const router = express.Router();
import * as offerController from "../controllers/offer.controllers.js";
router.post("/add-offer", offerController.AddOffer);
router.get("/get-all-offer", offerController.GetAllOffer);
router.post("/update-offer/:code", offerController.UpdateOffer);
router.delete("/delete-offer/:code", offerController.DeleteOffer);
export default router;