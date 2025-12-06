import express from "express";
import { doLike, likeCount } from "../controllers/blolike.controller.js";

const router = express.Router();

router.post("/toggle", doLike);
router.get("/count/:blogId", likeCount);

export default router;
