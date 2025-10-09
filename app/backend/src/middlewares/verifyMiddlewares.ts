import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import CustomError from "../utils/CustomError";

export interface AuthRequest extends Request {
  user?: JwtPayload & { role?: string };
}

export const verifyToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("req.cookies: ", req.cookies);
    const accessToken = req.cookies.access_token;
    console.log("accessToken: ", accessToken);
    console.log();
    if (!accessToken) throw new CustomError("Unauthorized", 401);

    const decoded = jwt.verify(
      accessToken,
      process.env.JWT_SECRET!
    ) as JwtPayload;
    req.user = decoded;

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return next(new CustomError("Token expired", 401));
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return next(new CustomError("Invalid token", 401));
    }
    next(error);
  }
};

export const verifyRoles = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !req.user.role || !roles.includes(req.user.role)) {
      return next(new CustomError("Forbidden: Insufficient role", 403));
    }
    next();
  };
};
