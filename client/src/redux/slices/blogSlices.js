import { createSlice } from "@reduxjs/toolkit";
import { createBlog } from "../api/blogAPI";

const initialState = {
  blogs: [],
  singleBlog: null,
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
      });
  },
});

export default blogSlice.reducer;
