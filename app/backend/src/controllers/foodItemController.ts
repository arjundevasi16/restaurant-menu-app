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
    const { name, basePrice, description } = req.body;
    const image = req.file ? req.file.filename : null;
    if (!name || !basePrice) {
      throw new CustomError("Name, basePrice are required", 400);
    }

    const [result]: any = await db.query(
      "INSERT INTO items (name, basePrice, image, description ) VALUES (?, ?, ?,?)",
      [name, basePrice, image, description]
    );
    res.status(201).json({
      message: "Item created successfully",
      itemId: result.insertId,
    });
  } catch (error) {
    next(error);
  }
};

export const addItemInCategory = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { categoryId, itemId } = req.body;
    if (!categoryId || !itemId) {
      throw new CustomError("categoryId and itemId are required", 400);
    }

    // check if category exists
    const [category]: any = await db.query(
      "SELECT id FROM categories WHERE id = ?",
      [categoryId]
    );
    if (category.length === 0) {
      throw new CustomError("Category not found", 404);
    }
    // check if item exists
    const [item]: any = await db.query("SELECT id FROM items WHERE id = ?", [
      itemId,
    ]);
    if (item.length === 0) {
      throw new CustomError("Item not found", 404);
    }

    // insert relation
    await db.query(
      "INSERT INTO item_categories (categoryId, itemId) VALUES (?, ?)",
      [categoryId, itemId]
    );
    res.status(201).json({
      message: "Item added to category successfully",
      data: { categoryId, itemId },
    });
  } catch (error) {
    next(error);
  }
};

export const getItems = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const [items]: any = await db.query(
      "SELECT id, name, basePrice AS price, description, image FROM items"
    );

    res.status(200).json({
      message: "Items fetched successfully",
      data: items,
    });
  } catch (error) {
    next(error);
  }
};

export const getItemsByCategory = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { categoryId } = req.params;
    if (!categoryId) {
      throw new CustomError("categoryId is required", 400);
    }
    const [items]: any = await db.query(
      `SELECT i.name,i.id,i.basePrice AS price,i.description, i.image
     FROM items i
     JOIN item_categories ic 
     on i.id=ic.itemId
     WHERE ic.categoryId = ?`,
      [categoryId]
    );
    res.status(200).json({
      message: "Items for category fetched successfully",
      data: items,
    });
  } catch (error) {
    next(error);
  }
};

export const addItemToRestaurant = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { restaurantId, itemId, customPrice } = req.body;

    if (!restaurantId || !itemId) {
      throw new CustomError("restaurantId and itemId are required", 400);
    }

    // check restaurant
    const [restaurant]: any = await db.query(
      "SELECT id, owner_id FROM restaurants WHERE id = ?",
      [restaurantId]
    );
    if (restaurant.length === 0) {
      throw new CustomError("Restaurant not found", 404);
    }
    if (restaurant[0].owner_id !== req.user.id) {
      throw new CustomError("You are not allowed to edit this restaurant", 403);
    }

    // check item exists in global catalog
    const [item]: any = await db.query("SELECT id FROM items WHERE id = ?", [
      itemId,
    ]);
    if (item.length === 0) {
      throw new CustomError("Item not found in global catalog", 404);
    }

    // insert into bridge
    await db.query(
      "INSERT INTO restaurant_items (restaurantId, itemId, customPrice, isAvailable) VALUES (?, ?, ?, ?)",
      [restaurantId, itemId, customPrice || null, true]
    );

    res.status(201).json({
      message: "Item added to restaurant menu successfully",
      data: { restaurantId, itemId, customPrice },
    });
  } catch (error) {
    next(error);
  }
};
