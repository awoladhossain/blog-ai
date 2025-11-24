import { StatusCodes } from "http-status-codes";
import Category from "../models/category.model.js";
import AppError from "../utils/AppError.js";
import { catchAsync } from "../utils/catchAsync.js";
import { successResponse } from "../utils/response.js";

export const addCategory = catchAsync(async (req, res, next) => {
  const { name, slug } = req.body;
  if (!name || !slug) {
    return next(
      new AppError("Please provide name and slug", StatusCodes.NOT_FOUND)
    );
  }
  const slugAvailable = await Category.findOne({ name });

  if (slugAvailable) {
    return next(
      new AppError(
        "Slug already exists with this name",
        StatusCodes.BAD_REQUEST
      )
    );
  }
  const category = await Category.create({ name, slug });

  return successResponse(
    res,
    StatusCodes.CREATED,
    "Category created successfully",
    category
  );
});

export const showCategory = catchAsync(async (req, res, next) => {});
export const showAllCategory = catchAsync(async (req, res, next) => {
  const category = await Category.find().sort({ createdAt: -1 });

  if (category.length === 0) {
    return next(new AppError("No category found", StatusCodes.NOT_FOUND));
  }
  return successResponse(
    res,
    StatusCodes.OK,
    "Category found successfully",
    category
  );
});
export const updateCategory = catchAsync(async (req, res, next) => {});
export const deleteCategory = catchAsync(async (req, res, next) => {});
