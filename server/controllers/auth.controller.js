import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";
import { catchAsync } from "../utils/catchAsync.js";
import generateToken from "../utils/generateToken.js";
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

  if (!user) {
    return next(new AppError("User does not exist", StatusCodes.BAD_REQUEST));
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return next(
      new AppError("Password doesn't Match"),
      StatusCodes.BAD_GATEWAY
    );
  }
  const token = generateToken(user._id);
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // true only in production
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  });

  return successResponse(res, StatusCodes.OK, "User Login Successfull", {
    user: {
      _id: user._id,
      role: user.role,
      fullname: user.fullname,
      email: user.email,
      avatar: user.avatar,
    },
    token,
  });
});

export const googleLogin = catchAsync(async (req, res, next) => {
  const {fullname, email, avatar}=req.body;
  let user;
  user = await User.findOne({ email });
  if (!user) {
    // create a new user
    const password = Math.round(Math.random() * 10000000).toString(); // ensure string
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
      avatar,
    });
    user = await newUser.save();
  }
  const token = generateToken(user._id);
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // true only in production
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  });
  return successResponse(
    res,
    StatusCodes.OK,
    "User Login Successfull with Google",
    {
      user: {
        _id: user._id,
        role: user.role,
        fullname: user.fullname,
        email: user.email,
        avatar: user.avatar,
      },
      token,
    }
  );
});

export const logoutUser = catchAsync(async (req, res, next) => {
  res.cookie("token", null, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // true only in production
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  });
  return successResponse(res, StatusCodes.OK, "User Logout Successfull", null);
});
