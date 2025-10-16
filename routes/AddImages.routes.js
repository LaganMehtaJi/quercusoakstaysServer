import express from "express";
import upload from "../utils/multerConfig.js";
import * as ImagesController from "../controllers/addDairy.controllers.js";

const router = express.Router();

router.post("/Images/add", upload.single("image"), ImagesController.AddImages);
router.get("/Images/get", ImagesController.GetAllImages);
router.delete("/Images/delete/:name", ImagesController.DeleteImages);
export default router;
