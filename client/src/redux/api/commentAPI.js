import { axiosInstance } from "@/helpers/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addComment = createAsyncThunk(
  "comment/add",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/comments/add", data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const getAllComments = createAsyncThunk("comment/getAll",async(_, thunkAPI)=>{
  try {
    const response = await axiosInstance.get("/comments/");
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message);
  }
})
