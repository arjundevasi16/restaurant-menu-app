import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { db } from "../config/db/index";
import CustomError from "../utils/CustomError";
import jwt from "jsonwebtoken";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      throw new CustomError("All fields are required", 400);
    }
    const roles = ["owner", "customer"];
    const useRoles = role && roles.includes(role) ? role : "customer";
    const hashedPassword = await bcrypt.hash(password, 10);
    const query =
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
    const values = [name, email, hashedPassword, useRoles];
    await db.query(query, values);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      throw new CustomError("All fields are required", 400);
    const [rows]: any = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (!rows || rows.length === 0) {
      throw new CustomError("Invalid email or password", 401);
    }
    const user = rows[0];
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new CustomError("Invalid email or password", 401);
    }
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
    console.log(rows[0]);
  } catch (error: unknown) {
    next(error);
  }
};
