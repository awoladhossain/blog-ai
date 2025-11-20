import { axiosInstance } from "@/helpers/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

// GET USER BY ID
export const getUserById = createAsyncThunk("users/getUserById", async(id, thunkAPI) => {
  try {
    const response = await axiosInstance.get(`/users/${id}`);
    console.log(response.data)
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message);
  }
})

export const updateUserProfile = createAsyncThunk();
