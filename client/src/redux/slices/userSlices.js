import { createSlice } from "@reduxjs/toolkit";
import { getUserById } from "../api/userAPI";

const initialState = {
  user: null,
  loading: false,
  error: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        (state.loading = false),
          (state.user = action.payload.data),
          (state.error = null);
      })
      .addCase(getUserById.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      });
  },
});

export default userSlice.reducer;
