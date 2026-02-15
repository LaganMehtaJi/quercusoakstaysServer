import express from "express";
const router = express.Router();

import * as offerController from "../controllers/Offer.controllers.js";

// Create Offer (Admin)
router.post("/create", offerController.createOffer);

// Get All Offers
router.get("/", offerController.getAllOffers);

// Get Single Offer by Code
router.get("/:code", offerController.getOfferByCode);

// Update Offer (Admin)
router.put("/update/:code", offerController.updateOffer);

// Delete Offer (Admin)
router.delete("/delete/:code", offerController.deleteOffer);

export default router;
