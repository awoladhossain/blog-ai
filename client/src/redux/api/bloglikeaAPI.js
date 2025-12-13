import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/helpers/axiosInstance";

/**
 * Toggle Like / Unlike
 */
export const toggleBlogLike = createAsyncThunk(
  "blogLike/toggle",
  async ({ blogId, userId }, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/likes/toggle", {
        blogId,
        userId,
      });



      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to toggle like"
      );
    }
  }
);

/**
 * Get Like Count
 */
export const getBlogLikeCount = createAsyncThunk(
  "blogLike/count",
  async (blogId, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/likes/count/${blogId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch like count"
      );
    }
  }
);
