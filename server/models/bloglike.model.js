import mongoose from "mongoose";

const blogLikeSchema = new mongoose.Schema(
  {
    userId: {
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

/**
 * Prevent duplicate likes from same user
 */
blogLikeSchema.index({ blogId: 1, userId: 1 }, { unique: true });

const BlogLike = mongoose.model("BlogLike", blogLikeSchema, "bloglikes");
export default BlogLike;
