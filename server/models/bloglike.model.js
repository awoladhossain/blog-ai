import mongoose from "mongoose";

const blogLikeSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Blog",
    },
  },
  { timestamps: true }
);
const BlogLike = mongoose.model("BlogLike", blogLikeSchema, "bloglikes");
export default BlogLike;
