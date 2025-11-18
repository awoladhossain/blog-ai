import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";
import { catchAsync } from "../utils/catchAsync.js";
import { successResponse } from "../utils/response.js";

export const registerUser = catchAsync(async (req, res, next) => {
  const { fullname, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new AppError("User already exists", StatusCodes.BAD_REQUEST));
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ fullname, email, password: hashedPassword });

  return successResponse(
    res,
    StatusCodes.CREATED,
    "User created successfully",
    user
  );
});

export const loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!email) {
    return next(
      new AppError("User Don't existing with the email"),
      StatusCodes.BAD_REQUEST
    );
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return next(
      new AppError("Password doesn't Match"),
      StatusCodes.BAD_GATEWAY
    );
  }

  return successResponse(res, StatusCodes.OK, "User Login Successfull", user);
});
