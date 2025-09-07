import express from "express";
import upload from "../utils/multerConfig.js";
import {
  AddProperty,
  GetAllProperties,
  GetPropertyById,
  UpdateProperty,
  DeleteProperty,
} from "../controllers/property.cotrollers.js";

const router = express.Router();

router.post("/add", upload.array("images", 100), AddProperty);
router.get("/", GetAllProperties);
router.get("/:id", GetPropertyById);
router.put("/update/:id", upload.array("images", 100), UpdateProperty);
router.delete("/delete/:id", DeleteProperty);

export default router;
