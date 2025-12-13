import { StatusCodes } from "http-status-codes";
import Blog from "../models/blog.model.js";
import Comment from "../models/comment.model.js";
import AppError from "../utils/AppError.js";
import { catchAsync } from "../utils/catchAsync.js";
import { successResponse } from "../utils/response.js";

export const addComment = catchAsync(async (req, res, next) => {
  const { author, blogId, content } = req.body;
  if (!author || !blogId || !content) {
    return next(
      new AppError(
        "Please provide author, blogId and comment",
        StatusCodes.BAD_REQUEST
      )
    );
  }

  const blog = await Blog.findById(blogId);
  if (!blog) {
    return next(new AppError("Blog not found", StatusCodes.NOT_FOUND));
  }
  const comment = new Comment({
    author,
    blogId,
    content,
  });
  await comment.save();
  return successResponse(
    res,
    StatusCodes.CREATED,
    "Comment created successfully",
    comment
  );
});

export const getAllComments = catchAsync(async (req, res, next) => {
  const comments = await Comment.find()
    .populate("blogId author")
    .sort({ createdAt: -1 });

  if (comments.length === 0) {
    return next(new AppError("No comments found", StatusCodes.NOT_FOUND));
  }
  return successResponse(
    res,
    StatusCodes.OK,
    "Comments found successfully",
    comments
  );
});

export const getCommentsByBlogId = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const comments = await Comment.find({ blogId: id })
    .populate("author", "fullname avatar role")
    .sort({ createdAt: -1 });

  return successResponse(
    res,
    StatusCodes.OK,
    "Comments found successfully",
    comments
  );
});

export const deleteComment = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const comment = await Comment.findByIdAndDelete(id);
  if (!comment) {
    return next(new AppError("Comment not found", StatusCodes.NOT_FOUND));
  }
  return successResponse(
    res,
    StatusCodes.OK,
    "Comment deleted successfully",
    comment
  );
});
