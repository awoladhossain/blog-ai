import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import connectDB from "./database/db.js";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
const PORT = process.env.PORT || 6000;
connectDB();
app.listen(PORT, () => {
  console.log("hello i am running");
  console.log(`Server is running on port ${PORT}`);
});
