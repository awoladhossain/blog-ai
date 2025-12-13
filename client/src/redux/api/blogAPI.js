import { axiosInstance } from "@/helpers/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createBlog = createAsyncThunk(
  "blog/create",
  async (data, thunkAPI) => {

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

export const getRelatedBlogs = createAsyncThunk(
  "blog/related",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/blogs/getRelated/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getBlogByCategory = createAsyncThunk(
  "blog/byCategory",
  async (category, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/blogs/get-blog/${category}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to load blogs"
      );
    }
  }
);

export const getBlogBySearch = createAsyncThunk(
  "blog/bySearch",
  async (query, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/blogs/search?q=${query}`);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to load blogs"
      );
    }
  }
);


