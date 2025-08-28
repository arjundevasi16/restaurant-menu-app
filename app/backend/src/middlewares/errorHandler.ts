import { Request, Response, NextFunction } from "express";
import CustomError from "../utils/CustomError";

function isDbError(error: unknown): error is { code: string } & Error {
  return typeof error === "object" && error !== null && "code" in error;
}

const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Something went wrong";

  if (err instanceof CustomError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (isDbError(err)) {
    switch (err.code) {
      case "ER_DUP_ENTRY":
        statusCode = 409;
        message = "The email address is already registered.";
        break;
      case "ER_NO_SUCH_TABLE":
        statusCode = 500;
        message = "Internal server error: The required table does not exist.";
        break;
      default:
        message = "A database error occurred.";
    }
  }

  console.error(err);
  res.status(statusCode).json({ message });
};

export default errorHandler;
