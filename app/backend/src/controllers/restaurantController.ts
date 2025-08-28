import { Request, Response, NextFunction } from "express";
import { db } from "../config/db";
import CustomError from "../utils/CustomError";
import { AuthRequest } from "../middlewares/verifyMiddlewares";

export const createRestaurant = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description } = req.body;
    const image = req.file?.filename;
    if (!name) throw new CustomError("Restaurant name is required", 400);
    const ownerId = req.user.id;
    const [result]: any = await db.query(
      "INSERT INTO restaurants (owner_id, name, description, image_url) VALUES (?, ?, ?, ?)",
      [ownerId, name, description, image]
    );

    res.status(201).json({
      message: "Restaurant created successfully",
      restaurant: {
        id: result.insertId,
        owner_id: ownerId,
        name,
        description,
        image,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getOwnerRestaurants = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM restaurants WHERE owner_id = ?",
      [req.user?.id]
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    next(error);
  }
};
export const getAllRestaurants = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const [rows] = await db.execute("SELECT * FROM restaurants");
    res.json({ success: true, data: rows });
  } catch (error) {
    next(error);
  }
};
