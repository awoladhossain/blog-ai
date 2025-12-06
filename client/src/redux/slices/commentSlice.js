import { createSlice } from "@reduxjs/toolkit";
import {
  addComment,
  getAllComments,
  getCommentsByBlogId,
} from "../api/commentAPI";
const initialState = {
  comments: [],
  loading: false,
  error: null,
};
const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.push(action.payload.data);
        state.error = null;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload.data;
        state.error = null;
      })
      .addCase(getAllComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCommentsByBlogId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCommentsByBlogId.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload.data;
        state.error = null;
      })
      .addCase(getCommentsByBlogId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default commentSlice.reducer;
// https://www.linkedin.com/in/ayan-paul-b31b45264/
