import { Request, Response, NextFunction } from "express";
import { db } from "../../config/db";
export const getRestaurants = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const [rows] = await db.query(
    "SELECT r.name, r.address users.name FROM restaurants as r JOIN  users WHERE id=owner_id"
  );

  res.status(200).json({
    success: true,
    data: rows,
  });
};
