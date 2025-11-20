import { StatusCodes } from "http-status-codes";
import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";
import { catchAsync } from "../utils/catchAsync.js";
import { successResponse } from "../utils/response.js";

export const getUserByID = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findOne({ _id: userId }).lean().exec();
  if (!user) {
    return next(new AppError("User not found", StatusCodes.NOT_FOUND));
  }
  return successResponse(res, StatusCodes.OK, "User found successfully", user);
});
