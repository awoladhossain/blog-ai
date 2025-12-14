import express from "express";
import {
  addBlog,
  deleteBlog,
  editBlog,
  getBlogByCategory,
  getBlogById,
  getRelatedBlogs,
  searchBlogs,
  showAllBlogs,
  showMyBlogs,
} from "../controllers/blog.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";

const route = express.Router();

// 1. POST/PUT/DELETE routes (any order is fine)
route.post("/add", protect, upload.single("avatar"), addBlog);
route.put("/blog-edit/:id", protect, upload.single("avatar"), editBlog);
route.delete("/:id", protect, deleteBlog);

// 2. GET routes - SPECIFIC routes first
route.get("/",  showAllBlogs);
route.get("/search", searchBlogs); // ✅ Specific route
route.get("/get-blog/:category", getBlogByCategory); // ✅ Has prefix, specific
route.get("/getRelated/:id", getRelatedBlogs); // ✅ Has prefix, specific
route.get("/my-blogs", protect, showMyBlogs);

// 3. GET routes - GENERIC/DYNAMIC routes last
route.get("/:id", getBlogById); // ✅ Generic catch-all

export default route;
