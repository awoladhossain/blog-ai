import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlices";

export default configureStore({
  reducer: {
    auth: authReducer,
  },
});
