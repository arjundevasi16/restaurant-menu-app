import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import CustomError from "../utils/CustomError";
import redis from "../utils/redis";

export const refreshAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) throw new CustomError("Unauthorized", 401);

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET!
    ) as JwtPayload & { tokenId: string };

    const redisKey = `refresh:user:${decoded.id}:${decoded.tokenId}`;
    const storedToken = await redis.get(redisKey);
    if (!storedToken || storedToken !== refreshToken) {
      throw new CustomError("Session expired or invalid", 401);
    }

    const newAccessToken = jwt.sign(
      { id: decoded.id, role: decoded.role },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" }
    );

    res.cookie("access_token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.json({ message: "Access token refreshed" });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return next(new CustomError("Refresh token expired", 401));
    }
    next(error);
  }
};
