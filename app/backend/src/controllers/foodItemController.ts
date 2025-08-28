import { Response, NextFunction } from "express";
import { AuthRequest } from "../middlewares/verifyMiddlewares";
import CustomError from "../utils/CustomError";
import { db } from "../config/db/index";

export const createItem = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, price, restaurantId } = req.body;
    const image = req.file ? req.file.filename : null;
    if (!name || !price || !restaurantId) {
      throw new CustomError("Name, price and restaurantId are required", 400);
    }
    const [restaurant]: any = await db.query(
      "SELECT id,owner_id FROM restaurants WHERE id=?",
      [restaurantId]
    );
    if (restaurant.length === 0) {
      throw new CustomError("Restaurant not found", 404);
    }
    if (restaurant[0].ownerId !== req.user.id) {
      throw new CustomError(
        "You are not allowed to add items to this restaurant",
        403
      );
    }
    const [result]: any = await db.query(
      "INSERT INTO items (name, price, image, restaurantId) VALUES (?, ?, ?, ?)",
      [name, price, image, restaurantId]
    );
    res.status(201).json({
      message: "Item created successfully",
      itemId: result.insertId,
    });
  } catch (error) {
    next(error);
  }
};
