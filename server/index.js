import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import connectDB from "./database/db.js";
import errorMiddleware from "./middlewares/error.middleware.js";
const PORT = process.env.PORT || 6000;
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
// routes
// global error handler
app.use(errorMiddleware);
connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
