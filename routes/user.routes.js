import express from "express";
import * as UserController from "../controllers/user.controller.js";
const router = express.Router();

router.post("/add", UserController.addUser);
router.get("/get", UserController.getUser);
router.post("/delete", UserController.deleteUser);
router.post("/verify", UserController.userVerification);

export default router;