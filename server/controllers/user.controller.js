import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import streamifier from "streamifier";
import cloudinary from "../config/cloudinary.js";
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

export const updateUserProfile = catchAsync(async (req, res, next) => {
  console.log(req.file);
  console.log(req.body);
  const { userId } = req.params;

  const user = await User.findById(userId);
  if (!user) {
    return next(new AppError("User not found", StatusCodes.NOT_FOUND));
  }
  user.fullname = req.body.fullname;
  // user.email = req.body.email;
  user.bio = req.body.bio;
  // PASSWORD UPDATE LOGIC
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(
        new AppError(
          "Password must be at least 6 characters",
          StatusCodes.BAD_REQUEST
        )
      );
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    user.password = hashedPassword;
  }
  // cloudinary upload using stramifier
  if (req.file) {
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "user-profile",
          resource_type: "image",
        },
        (error, data) => {
          if (error) reject(error);
          else resolve(data);
        }
      );
      streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
    });
    user.avatar = result.secure_url;
  }
  // ! password not to send with update request
  await user.save();
  return successResponse(
    res,
    StatusCodes.OK,
    "User updated successfully",
    user
  );
});
