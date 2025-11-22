import express from "express";
import {
  getUserByID,
  updateUserProfile,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/upload.middleware.js";
const router = express.Router();

router.get("/:userId", getUserByID);
router.put("/:userId", upload.single("avatar"), updateUserProfile);

export default router;
