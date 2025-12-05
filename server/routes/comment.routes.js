import express from "express";
import {
  addComment,
  getAllComments,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/add", addComment);
router.get("/", getAllComments);

export default router;
