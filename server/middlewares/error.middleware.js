import { errorResponse } from "../utils/response.js";

const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";
  return errorResponse(
    res,
    statusCode,
    message,
    process.env.NODE_ENV === "development" ? err.stack : null
  );
};

export default errorMiddleware;
