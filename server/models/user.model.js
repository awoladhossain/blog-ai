import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
      required: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    avatar: {
      type: String,
      trim: true,
      default: "",
    },
    password: {
      type: String,
      required: true,
      trim: true,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema, "users");
export default User;
