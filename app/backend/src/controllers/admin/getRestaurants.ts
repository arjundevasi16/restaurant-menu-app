import { Request, Response, NextFunction } from "express";
import { db } from "../../config/db";
export const getRestaurants = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const [rows] = await db.query("SELECT id, name, address FROM restaurants");

  res.status(200).json({
    success: true,
    data: rows,
  });
};
