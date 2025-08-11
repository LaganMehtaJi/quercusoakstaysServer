import express from "express";
import * as listcontroller from "../controllers/listproperty.controllers.js";
const router = express.Router();

router.post("/add", listcontroller.addProperty);
router.get("/get", listcontroller.getProperty);
router.post("/delete", listcontroller.deleteProperty);

export default router;


