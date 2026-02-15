import express from "express";
const router = express.Router();

import * as QueryController from "../controllers/Query.controllers.js";

// Create New Query (Contact Form)
router.post("/create-query", QueryController.createQuery);

// Get All Queries (Admin)
router.get("/get-all-queries", QueryController.getAllQueries);

// Get Single Query by ID
router.get("/get-query/:id", QueryController.getQueryById);

// Update Query Status (Admin)
router.put("/update-query/:id", QueryController.updateQueryStatus);

// Delete Query
router.delete("/delete-query/:id", QueryController.deleteQuery);

export default router;
