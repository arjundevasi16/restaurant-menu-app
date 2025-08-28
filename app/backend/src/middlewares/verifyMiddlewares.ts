import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import CustomError from "../utils/CustomError";
export interface AuthRequest extends Request {
  user?: any | JwtPayload;
}
export const verifyToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("jwt key", process.env.JWT_SECRET);

    const authHeader = req.headers["authorization"];
    console.log("authHeader: ", authHeader);

    if (!authHeader) throw new CustomError("Token not provided", 401);
    const token = authHeader?.split(" ")[1];
    console.log("token: ", token);
    if (!token) throw new CustomError("Invalid token format", 401);
    const decode = jwt.verify(token, process.env.JWT_SECRET as string);
    console.log("decode: ", decode);
    req.user = decode;

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return next(new CustomError("Token expired", 401));
    }
    if (error instanceof jwt.JsonWebTokenError) {
      console.log("error", error);

      return next(new CustomError("Invalid token", 401));
    }
    next(error);
  }
};
export const verifyRole = (role: string) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user?.role !== role) {
      return next(new CustomError("Forbidden", 403));
    }
    next();
  };
};
