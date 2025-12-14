import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserByID,
  updateUserProfile,
} from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";
const router = express.Router();

router.get("/", protect, getAllUsers);
router.get("/:userId", protect, getUserByID);
router.put("/:userId", protect, upload.single("avatar"), updateUserProfile);
router.delete("/delete/:userId", protect, deleteUser);

export default router;
