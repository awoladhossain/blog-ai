import { encode } from "entities";
import cloudinary from "../config/cloudinary.js";
import Blog from "../models/blog.model.js";
import { catchAsync } from "../utils/catchAsync.js";
import { successResponse } from "../utils/response.js";
import AppError from "../utils/AppError.js";
import streamifier from "streamifier";

export const addBlog = catchAsync(async (req, res, next) => {
  console.log("req.file:", req.file); // Check if file is received
  console.log("req.body.data:", req.body.data); // Check if data is received
  const data = JSON.parse(req.body.data);

  // Check if file exists
  if (!req.file) {
    return next(new AppError("Featured image is required", 400));
  }

  let featuredImage = "";

  try {
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "blog-image" },
        (error, data) => (error ? reject(error) : resolve(data))
      );

      streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
    });

    featuredImage = result.secure_url;
  } catch (uploadError) {
    return next(new AppError("Failed to upload image", 500));
  }

  // Validate featuredImage before saving
  if (!featuredImage) {
    return next(new AppError("Failed to process featured image", 500));
  }

  const blog = new Blog({
    author: data.author,
    category: data.category,
    title: data.title,
    slug: data.slug,
    featuredImage,
    description: encode(data.description),
  });

  const newBlog = await blog.save();

  return successResponse(res, 201, "Blog created", newBlog);
});

