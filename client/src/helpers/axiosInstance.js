import axios from "axios";

const API_URL = import.meta.env.VITE_API_BACKEND_URL;

export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // 🔥 required for sending/receiving cookies
  headers: {
    "Content-Type": "application/json",
  },
});
