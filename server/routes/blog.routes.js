import express from "express"
import { addBlog } from "../controllers/blog.controller.js"
import { upload } from "../middlewares/upload.middleware.js"

const route = express.Router()

route.post("/add", upload.single("avatar"), addBlog);

export default route
