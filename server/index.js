import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import connectDB from "./database/db.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import authRouters from "./routes/auth.routes.js";
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
app.get("/", (req, res) => {
  res.send("Hello from backend");
})
app.use("/api/auth", authRouters);

// global error handler
app.use(errorMiddleware);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
