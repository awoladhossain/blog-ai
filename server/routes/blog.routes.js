import express from "express";
import { addBlog, showAllBlogs } from "../controllers/blog.controller.js";
import { upload } from "../middlewares/upload.middleware.js";

const route = express.Router();

route.post("/add", upload.single("avatar"), addBlog);
route.get("/", showAllBlogs);

export default route;
