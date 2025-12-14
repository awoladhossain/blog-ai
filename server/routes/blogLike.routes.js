import express from "express";
import { doLike, likeCount } from "../controllers/blolike.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/toggle", protect, doLike);
router.get("/count/:blogId", likeCount);

export default router;
