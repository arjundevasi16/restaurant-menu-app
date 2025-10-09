import { Request, Response, NextFunction } from "express";
import CustomError from "../utils/CustomError";
import { db } from "../config/db";

export const insertTable = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, value } = req.body;
    if (!name || !value) {
      throw new CustomError("fields are required", 400);
    }

    const [result] = await db.query(
      "INSERT INTO testdata (name, value) VALUES (?, ?)",
      [name, value]
    );

    res.status(201).json({
      message: "Row inserted successfully",
      result,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteTableRow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.body;
    if (!id) {
      throw new CustomError("id is required", 400);
    }

    const [result] = await db.query("DELETE FROM testdata WHERE id = ?", [id]);

    res.json({
      message: "Row deleted successfully",
      result,
    });
  } catch (err) {
    next(err);
  }
};

export const editTableRow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, value } = req.body;
    if (!id || !value) {
      throw new CustomError("id and value are required", 400);
    }

    const [result] = await db.query(
      "UPDATE testdata SET value = ? WHERE id = ?",
      [value, id]
    );

    res.json({
      message: "Row updated successfully",
      result,
    });
  } catch (err) {
    next(err);
  }
};

export const getTableData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    page = Number(page);
    limit = Number(limit);

    if (page < 1) page = 1;
    if (limit < 1) limit = 10;

    const offset = (page - 1) * limit;

    const [rows] = await db.query(
      "SELECT * FROM testdata ORDER BY id LIMIT ? OFFSET ?",
      [limit, offset]
    );
    const [[{ count }]] = await db.query(
      "SELECT COUNT(*) as count FROM testdata"
    );
    console.log("count", count);
    res.json({
      page,
      limit,
      totalRows: count,
      data: rows,
    });
  } catch (err) {
    next(err);
  }
};
