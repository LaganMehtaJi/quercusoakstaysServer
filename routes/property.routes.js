import express from "express";
import * as propertyControllers from "../controllers/property.controllers.js";

const router = express.Router();

router.get("/get",propertyControllers.getProperties);
router.post("/add",propertyControllers.addProperty);
router.post("/update",propertyControllers.updateProperty);
router.post("/delete",propertyControllers.deleteProperty);

export default router;
