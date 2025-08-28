import { Request, Response, NextFunction } from "express";
import CustomError from "../utils/CustomError";
import { db } from "../config/db";

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, restaurantId } = req.body;
    if (!name || !restaurantId) {
      throw new CustomError("Name and restaurantId are required", 400);
    }
    const image = req.file?.filename;
    const [result]: any = await db.query(
      "INSERT INTO categories (name,restaurantId,image) VALUES (?,?,?)",
      [name, restaurantId, image]
    );
    res.status(201).json({
      message: "Category created successfully",
      category: {
        id: result.insertId,
        name,
        image,
        restaurantId,
      },
    });
  } catch (error) {
    next(error);
  }
};
export const createItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
export const getCategoriesByRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { restaurantId } = req.params;
    const [rows]: any = await db.query(
      "SELECT * FROM categories WHERE restaurantId = ?",
      [restaurantId]
    );
    res.status(200).json({
      message: "Categories fetched successfully",
      categories: rows,
    });
  } catch (error) {
    next(error);
  }
};
