import { encode } from "html-entities";
import { StatusCodes } from "http-status-codes";
import streamifier from "streamifier";
import cloudinary from "../config/cloudinary.js";
import Blog from "../models/blog.model.js";
import Category from "../models/category.model.js";
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
  return successResponse(res, StatusCodes.CREATED, "Blog created", newBlog);
});

export const showAllBlogs = catchAsync(async (req, res, next) => {
  const blogs = await Blog.find()
    .populate("author", "fullname avatar role")
    .populate("category", "name slug")
    .sort({ createdAt: -1 })
    .lean()
    .exec();
  return successResponse(
    res,
    StatusCodes.OK,
    "Blogs found successfully",
    blogs
  );
});

export const getBlogById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const blog = await Blog.findById(id)
    .populate("author", "fullname avatar role")
    .populate("category", "name slug")
    .lean()
    .exec();
  if (!blog) {
    return next(new AppError("Blog not found", StatusCodes.NOT_FOUND));
  }
  return successResponse(res, StatusCodes.OK, "Blog found successfully", blog);
});

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

export const deleteBlog = async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return next(new AppError("Blog not found", 404));
  }

  // 🔐 Ownership check
  if (blog.author.toString() !== req.user._id.toString()) {
    return next(new AppError("Unauthorized", 403));
  }

  await blog.deleteOne();

  return successResponse(res, 200, "Blog deleted successfully", blog);
};

export const getRelatedBlogs = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const blogs = await Blog.find({ category: id }).lean().exec();
  if (blogs.length === 0) {
    return next(new AppError("No related blog found", StatusCodes.NOT_FOUND));
  }
  return successResponse(
    res,
    StatusCodes.OK,
    "Blogs found successfully",
    blogs
  );
});

export const getBlogByCategory = catchAsync(async (req, res, next) => {
  const { category } = req.params;
  const categoryData = await Category.findOne({ slug: category });
  if (!categoryData) {
    return next(new AppError("Category not found", StatusCodes.NOT_FOUND));
  }
  const categoryId = categoryData._id;
  const blog = await Blog.find({ category: categoryId })
    .populate("author", "fullname avatar")
    .lean()
    .exec();
  return successResponse(res, StatusCodes.OK, "Blogs found successfully", blog);
});

export const searchBlogs = catchAsync(async (req, res, next) => {
  const { q } = req.query;

  if (!q) {
    return next(
      new AppError("Please provide a search query", StatusCodes.BAD_REQUEST)
    );
  }

  const blogs = await Blog.find({
    $or: [
      { title: { $regex: q, $options: "i" } },
      { description: { $regex: q, $options: "i" } },
      { slug: { $regex: q, $options: "i" } },
    ],
  })
    .populate("category", "name slug")
    .populate("author", "fullname avatar");

  return successResponse(
    res,
    StatusCodes.OK,
    "Blogs found successfully",
    blogs
  );
});

export const showMyBlogs = async (req, res, next) => {
  const blogs = await Blog.find({ author: req.user._id })
    .populate("author", "fullname")
    .populate("category", "name");

  return successResponse(res, 200, "My blogs", blogs);
};
