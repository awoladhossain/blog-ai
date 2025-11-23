import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import connectDB from "./database/db.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import authRouters from "./routes/auth.routes.js";
import categoryRouters from "./routes/category.routes.js";
import userRouters from "./routes/user.routes.js";

// Create app
const app = express();

// DB Connect BEFORE server starts
connectDB();

// Middlewares (Global)
app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// Morgan (Only in development mode)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.get("/", (req, res) => {
  res.send("Hello from backend");
});

app.use("/api/auth", authRouters);
app.use("/api/users", userRouters);
app.use("/api/categories", categoryRouters);

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});

// Global Error Handler (Always LAST)
app.use(errorMiddleware);
