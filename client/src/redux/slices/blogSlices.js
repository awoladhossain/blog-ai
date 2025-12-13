import { createSlice } from "@reduxjs/toolkit";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogByCategory,
  getBlogBySearch,
  getRelatedBlogs,
  singleBlog,
  updateBlog,
} from "../api/blogAPI";

const initialState = {
  blogs: [],
  categoryBlogs: [],
  singleBlog: null,
  relatedBlogs: [],
  loading: false,
  error: null,
};
const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs.push(action.payload.data);
        state.error = null;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload.data;
        state.error = null;
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.loading = false;
        // Use the ID from meta.arg (the original argument passed to the thunk)
        state.blogs = state.blogs.filter(
          (blog) => blog._id !== action.meta.arg
        );
        state.error = null;
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(singleBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(singleBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.singleBlog = action.payload.data;
        state.error = null;
      })
      .addCase(singleBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.loading = false;
        // Update the blog in the array
        const index = state.blogs.findIndex(
          (blog) => blog._id === action.payload.data._id
        );
        if (index !== -1) {
          state.blogs[index] = action.payload.data;
        }
        state.singleBlog = action.payload.data;
        state.error = null;
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getRelatedBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRelatedBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.relatedBlogs = action.payload.data;
        state.error = null;
      })
      .addCase(getRelatedBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getBlogByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBlogByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryBlogs = action.payload.data;
        state.error = null;
      })
      .addCase(getBlogByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getBlogBySearch.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.blogs = [];
      })
      .addCase(getBlogBySearch.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload.data;
        state.error = null;
      })
      .addCase(getBlogBySearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default blogSlice.reducer;
