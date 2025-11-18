import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API = import.meta.env.VITE_API_BACKEND_URL;

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ fullname, email, password }, thunkAPI) => {
    try {
      const response = await axios.post(`${API}/auth/register`, {
        fullname,
        email,
        password,
      });
      console.log(response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);
