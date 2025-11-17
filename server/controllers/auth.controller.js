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

export const login = (req, res) => {
  res.send("login");
};
