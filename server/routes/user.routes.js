import express from "express"
import { getUserByID } from "../controllers/user.controller.js";
const router = express.Router()


router.get("/:userId", getUserByID);

export default router;
