import { encode } from "html-entities";
import streamifier from "streamifier";
import cloudinary from "../config/cloudinary.js";
import Blog from "../models/blog.model.js";
import AppError from "../utils/AppError.js";
import { catchAsync } from "../utils/catchAsync.js";
import { successResponse } from "../utils/response.js";

export const addBlog = catchAsync(async (req, res, next) => {
  const data = JSON.parse(req.body.data || "{}");

  if (!req.file) return next(new AppError("Featured image is required", 400));

  // upload image...
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

  // safe description
  const descriptionText = data?.description ?? "";
  const safeDescription = encode(String(descriptionText));

  const blog = new Blog({
    author: data.author,
    category: data.category,
    title: data.title,
    slug: data.slug,
    featuredImage,
    description: safeDescription,
  });

  const newBlog = await blog.save();
  return successResponse(res, 201, "Blog created", newBlog);
});

export const showAllBlogs = catchAsync(async (req, res, next) => {
  const blogs = await Blog.find()
    .populate("author", "fullname")
    .populate("category", "name")
    .sort({ createdAt: -1 })
    .lean()
    .exec();
  return successResponse(res, 200, "Blogs found successfully", blogs);
});
