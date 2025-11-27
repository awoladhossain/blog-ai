import { axiosInstance } from "@/helpers/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const createBlog = createAsyncThunk("blog/create", async(data, thunkAPI)=>{
  // console.log(data);
  try {
    const response = await axiosInstance.post("/blogs/add", data,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message);
  }
})
