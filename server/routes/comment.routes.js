import express from "express";
import {
  addComment,
  getAllComments,
  getCommentsByBlogId,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/add", addComment);
router.get("/", getAllComments);
router.get("/:id", getCommentsByBlogId);

export default router;
