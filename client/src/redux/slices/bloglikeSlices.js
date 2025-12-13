import { createSlice } from "@reduxjs/toolkit";
import { getBlogLikeCount, toggleBlogLike } from "../api/bloglikeaAPI";

const initialState = {
  totalLike: 0,
  action: null, // "liked" or "unliked"
  loading: false,
  error: null,
};

const blogLikeSlice = createSlice({
  name: "blogLike",
  initialState,
  reducers: {
    resetLikeState: (state) => {
      state.action = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* TOGGLE LIKE */
      .addCase(toggleBlogLike.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleBlogLike.fulfilled, (state, action) => {
        state.loading = false;

        // ✅ Handle response: check if data is nested
        const payload = action.payload?.data || action.payload;

        state.totalLike = payload?.totalLike ?? state.totalLike;
        state.action = payload?.action ?? null;


      })
      .addCase(toggleBlogLike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* LIKE COUNT */
      .addCase(getBlogLikeCount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBlogLikeCount.fulfilled, (state, action) => {
        state.loading = false;

        // ✅ Handle response: check if data is nested
        const payload = action.payload?.data || action.payload;
        state.totalLike = payload?.totalLike ?? 0;
      })
      .addCase(getBlogLikeCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetLikeState } = blogLikeSlice.actions;
export default blogLikeSlice.reducer;
