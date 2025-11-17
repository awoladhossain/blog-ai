import { ReasonPhrases, StatusCodes } from "http-status-codes";

export const successResponse = (
  res,
  status = StatusCodes.OK,
  message = ReasonPhrases.OK,
  data = null
) => {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
};

export const errorResponse = (
  res,
  status = StatusCodes.BAD_REQUEST,
  message = ReasonPhrases.BAD_REQUEST,
  error = null
) => {
  return res.status(status).json({
    success: false,
    message,
    error,
  });
};
