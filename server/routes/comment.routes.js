import express from "express";
import {
  addComment,
  deleteComment,
  getAllComments,
  getCommentsByBlogId,
} from "../controllers/comment.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/add", protect, addComment);
router.get("/", getAllComments);
router.get("/:id", protect, getCommentsByBlogId);
router.delete("/comment-delete/:id", protect, deleteComment);

export default router;
