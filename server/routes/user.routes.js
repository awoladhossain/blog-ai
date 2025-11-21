import express from "express"
import { getUserByID, updateUserProfile } from "../controllers/user.controller.js";
const router = express.Router()


router.get("/:userId", getUserByID);
router.put("/:userId",updateUserProfile)

export default router;
