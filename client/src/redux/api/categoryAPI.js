import { axiosInstance } from "@/helpers/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createCategory = createAsyncThunk(
  "category/create",
  async (data, thunkAPI) => {
   
    try {
      const response = await axiosInstance.post("/categories/add", data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getAllCategories = createAsyncThunk(
  "category/getAll",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/categories/");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getCategoryById = createAsyncThunk(
  "category/getById",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/categories/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/update",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(
        `/categories/update/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const deleteCategory = createAsyncThunk("category/delete", async(id, thunkAPI)=>{
  try {
    const response = await axiosInstance.delete(`/categories/${id}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message);
  }
})
