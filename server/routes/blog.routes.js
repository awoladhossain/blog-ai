import express from "express";
import {
  addBlog,
  deleteBlog,
  editBlog,
  getBlogById,
  getRelatedBlogs,
  showAllBlogs,
} from "../controllers/blog.controller.js";
import { upload } from "../middlewares/upload.middleware.js";

const route = express.Router();

route.post("/add", upload.single("avatar"), addBlog);
route.get("/", showAllBlogs);
route.get("/:id", getBlogById);
route.put("/blog-edit/:id", upload.single("avatar"), editBlog);
route.delete("/:id", deleteBlog);
route.get("/getRelated/:id", getRelatedBlogs);

export default route;
