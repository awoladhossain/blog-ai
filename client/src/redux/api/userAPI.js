import { axiosInstance } from "@/helpers/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

// GET USER BY ID
export const getUserById = createAsyncThunk(
  "users/getUserById",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/users/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);
// UPDATE USER PROFILE
export const updateUserProfile = createAsyncThunk(
  "users/updateUserProfile",
  async ({ id, formData }, thunkAPI) => {
    try {
      console.log({id,formData})
      const response = await axiosInstance.put(`/users/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);
