import express from "express";
import {
  addComment,
  deleteComment,
  getAllComments,
  getCommentsByBlogId,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/add", addComment);
router.get("/", getAllComments);
router.get("/:id", getCommentsByBlogId);
router.delete("/comment-delete/:id", deleteComment);

export default router;
