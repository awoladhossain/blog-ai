import { StatusCodes } from "http-status-codes";
import BlogLike from "../models/bloglike.model.js";
import AppError from "../utils/AppError.js";
import { catchAsync } from "../utils/catchAsync.js";
import { successResponse } from "../utils/response.js";

export const doLike = catchAsync(async (req, res, next) => {
  const { blogId, userId } = req.body;

  if (!blogId || !userId) {
    return next(
      new AppError("Please provide blogId and userId", StatusCodes.BAD_REQUEST)
    );
  }

  const existingLike = await BlogLike.findOne({ blogId, userId });

  let action;

  if (!existingLike) {
    // LIKE
    await BlogLike.create({ blogId, userId });
    action = "liked";
  } else {
    // UNLIKE
    await BlogLike.findByIdAndDelete(existingLike._id);
    action = "unliked";
  }

  const totalLike = await BlogLike.countDocuments({ blogId });

  // ✅ Return object with totalLike and action properties
  return successResponse(
    res,
    StatusCodes.OK,
    `${action} successfully`,
    { totalLike, action } // Changed from totalLike.toString()
  );
});

export const likeCount = catchAsync(async (req, res, next) => {
  const { blogId } = req.params;

  if (!blogId) {
    return next(new AppError("Please provide blogId", StatusCodes.BAD_REQUEST));
  }

  const totalLike = await BlogLike.countDocuments({ blogId });

  // ✅ Return object with totalLike property
  return successResponse(
    res,
    StatusCodes.OK,
    "Like count found successfully",
    { totalLike } // Changed from totalLike.toString()
  );
});
