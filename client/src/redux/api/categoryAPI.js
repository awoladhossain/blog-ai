import { axiosInstance } from "@/helpers/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createCategory = createAsyncThunk(
  "category/create",
  async (data, thunkAPI) => {
    console.log(data)
    try {
      const response = await axiosInstance.post("/categories/add", data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getAllCategories = createAsyncThunk("category/getAll", async(_, thunkAPI)=>{
  try {
    const response = await axiosInstance.get("/categories/");
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message);
  }
})
