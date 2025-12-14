import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";
import { catchAsync } from "../utils/catchAsync.js";

export const protectAdmin = catchAsync(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return next(
      new AppError(
        "Not authorized to access this route",
        StatusCodes.UNAUTHORIZED
      )
    );
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id).select("-password");
  if (!user) {
    return next(
      new AppError(
        "Not authorized to access this route",
        StatusCodes.UNAUTHORIZED
      )
    );
  }
  if (user.role === "admin") {
    req.user = user;
    next();
  } else {
    return next(
      new AppError(
        "Not authorized to access this route",
        StatusCodes.UNAUTHORIZED
      )
    );
  }
});
