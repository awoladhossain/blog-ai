import { encode } from "html-entities";
import streamifier from "streamifier";
import cloudinary from "../config/cloudinary.js";
import Blog from "../models/blog.model.js";
import AppError from "../utils/AppError.js";
import { catchAsync } from "../utils/catchAsync.js";
import { successResponse } from "../utils/response.js";
import { StatusCodes } from "http-status-codes";

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
  return successResponse(res, StatusCodes.CREATED, "Blog created", newBlog);
});

export const showAllBlogs = catchAsync(async (req, res, next) => {
  const blogs = await Blog.find()
    .populate("author", "fullname avatar role")
    .populate("category", "name")
    .sort({ createdAt: -1 })
    .lean()
    .exec();
  return successResponse(res, StatusCodes.OK, "Blogs found successfully", blogs);
});

export const getBlogById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const blog = await Blog.findById(id)
    .populate("author", "fullname")
    .populate("category", "name")
    .lean()
    .exec();
  if (!blog) {
    return next(new AppError("Blog not found", StatusCodes.NOT_FOUND));
  }
  return successResponse(res, StatusCodes.OK, "Blog found successfully", blog);
})

export const editBlog = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  // Find the existing blog
  const blog = await Blog.findById(id);
  if (!blog) {
    return next(new AppError("Blog not found", StatusCodes.NOT_FOUND));
  }

  // Parse the JSON data from the form
  const data = JSON.parse(req.body.data || "{}");

  // Prepare update object
  const updateData = {
    category: data.category,
    title: data.title,
    slug: data.slug,
    author: data.author,
  };

  // Handle description encoding
  if (data.description) {
    const descriptionText = data.description ?? "";
    const safeDescription = encode(String(descriptionText));
    updateData.description = safeDescription;
  }

  // If a new image was uploaded, handle it
  if (req.file) {
    try {
      // Delete old image from Cloudinary (optional but recommended)
      if (blog.featuredImage) {
        const urlParts = blog.featuredImage.split("/");
        const publicIdWithExtension = urlParts[urlParts.length - 1];
        const publicId = publicIdWithExtension.split(".")[0];
        await cloudinary.uploader.destroy(`blog-image/${publicId}`);
      }

      // Upload new image using streamifier
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "blog-image" },
          (error, data) => (error ? reject(error) : resolve(data))
        );
        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });

      updateData.featuredImage = result.secure_url;
    } catch (uploadError) {
      return next(new AppError("Failed to upload image", 500));
    }
  }

  // Update the blog
  const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, {
    new: true, // Return the updated document
    runValidators: true, // Run schema validators
  })
    .populate("category", "name")
    .populate("author", "fullname")
    .lean()
    .exec();

  return successResponse(
    res,
    StatusCodes.OK,
    "Blog updated successfully",
    updatedBlog
  );
});

export const deleteBlog = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  console.log("the error: ", id);
  const blog = await Blog.findByIdAndDelete(id);

  if (!blog) {
    return next(new AppError("Blog not found", StatusCodes.NOT_FOUND));
  }

  // Return the deleted blog
  return successResponse(
    res,
    StatusCodes.OK,
    "Blog deleted successfully",
    blog
  );
});
