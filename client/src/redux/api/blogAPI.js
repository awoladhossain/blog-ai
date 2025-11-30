import { axiosInstance } from "@/helpers/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createBlog = createAsyncThunk(
  "blog/create",
  async (data, thunkAPI) => {
    // console.log(data);
    try {
      const response = await axiosInstance.post("/blogs/add", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getAllBlogs = createAsyncThunk(
  "blog/getAll",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/blogs/");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "blog/delete",
  async (id, thunkAPI) => {
    console.log(id);
    try {
      const response = await axiosInstance.delete(`/blogs/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const singleBlog = createAsyncThunk(
  "blog/single",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/blogs/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const updateBlog = createAsyncThunk(
  "blog/update",
  async ({ id, formData }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(
        `/blogs/blog-edit/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);
