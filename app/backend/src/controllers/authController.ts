import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";

import bcrypt from "bcryptjs";
import crypto from "crypto";
import { db } from "../config/db/index";
import jwt from "jsonwebtoken";
import CustomError from "../utils/CustomError";
import {
  findUserByEmailOrMobileExists,
  createUser,
  getRoleIdByName,
  findUserByEmailOrMobile,
  updateLastLogin,
} from "../services/userService";
import { transporter } from "../utils/mailer";
import redis from "../utils/redis";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, mobile, verifyBy } = req.body;
    if (!name || !email || !password || !mobile || !verifyBy) {
      throw new CustomError("All fields are required", 400);
    }
    const existing = await findUserByEmailOrMobileExists(email, mobile);
    if (existing) {
      if (existing.email === email)
        throw new CustomError("Email already registered", 400);
      if (existing.mobile === mobile)
        throw new CustomError("Mobile already registered", 400);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const roleId = await getRoleIdByName("customer");
    if (!roleId) throw new CustomError("Customer role not found", 500);
    const userId = await createUser(
      name,
      email,
      mobile,
      hashedPassword,
      roleId,
      verifyBy
    );
    if (verifyBy === "email") {
      const token = crypto.randomBytes(32).toString("hex");
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
      await db.query(
        "INSERT INTO verification_tokens (user_id, token, expires_at) VALUES (?, ?, ?)",
        [userId, token, expiresAt]
      );
      // await transporter.sendMail({
      //   from: `"Restaurant App" <${process.env.EMAIL_USER}>`,
      //   to: email,
      //   subject: "Verify your email",
      //   html: `<p>Click <a href="${process.env.FRONTEND_URL}/email-verified?token=${token}">here</a> to verify your email.</p>`,
      // });
    }
    if (verifyBy === "mobile") {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      await redis.setEx(`otp:mobile:${userId}`, 300, otp);
      // await transporter.sendMail({
      //   from: `"Restaurant App" <${process.env.EMAIL_USER}>`,
      //   to: email,
      //   subject: "Verify your mobile",
      //   html: `<p>Verify your mobile otp:${otp}</p>`,
      // });
      console.log("your otp is :", otp);
    }
    res.status(201).json({
      message: `User registered successfully, verify via ${verifyBy}`,
      user: { id: userId, name, email, mobile, role: "customer" },
    });
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
    const { emailOrMobile, password } = req.body;

    const user = await findUserByEmailOrMobile(emailOrMobile);
    if (!user) throw new CustomError("Invalid credentials", 400);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new CustomError("Invalid credentials", 400);

    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" }
    );

    const tokenId = uuidv4();

    const refreshToken = jwt.sign(
      { id: user.id, role: user.role, tokenId },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: "7d" }
    );

    await redis.setEx(
      `refresh:user:${user.id}:${tokenId}`,
      7 * 24 * 60 * 60,
      refreshToken
    );

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshToken = req.cookies?.refresh_token;
    if (refreshToken) {
      try {
        const decoded: any = jwt.verify(
          refreshToken,
          process.env.JWT_REFRESH_SECRET!
        );
        const { id: userId, tokenId } = decoded;
        await redis.del(`refresh:user:${userId}:${tokenId}`);
      } catch (err) {
        console.warn("Invalid or expired refresh token at logout");
      }
    }
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.json({ message: "Logout successful" });
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.query; // token passed as query param
    if (!token) throw new CustomError("Token is required", 400);
    console.log("Token from code:", token, "Length:", token?.length);

    const [rows]: any = await db.query(
      "SELECT * FROM verification_tokens WHERE  token =?  AND used !=1",
      [token]
    );

    console.log("rows", rows);
    if (!rows.length) throw new CustomError("Invalid or used token", 400);

    const record = rows[0];
    const now = new Date();

    if (now > record.expires_at) {
      throw new CustomError("Token expired", 400);
    }

    await db.query("UPDATE users SET email_status = 2 WHERE id = ?", [
      record.user_id,
    ]);

    await db.query("UPDATE verification_tokens SET used = 1 WHERE id = ?", [
      record.id,
    ]);
    res.json({ message: "Email verified successfully. You can now login." });
  } catch (error) {
    next(error);
  }
};

export const verifyMobile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, otp } = req.body;
    console.log(userId, otp);
    const storedOtp = await redis.get(`otp:mobile:${userId}`);
    console.log("storedOtp: ", storedOtp);
    if (!storedOtp) throw new CustomError("OTP expired", 400);
    if (storedOtp !== otp) throw new CustomError("Invalid OTP", 400);

    await db.query("UPDATE users SET mobile_status = 2 WHERE id = ?", [userId]);
    await redis.del(`otp:mobile:${userId}`);

    res.json({ message: "Mobile verified successfully" });
  } catch (err) {
    next(err);
  }
};

export const verifyUser = async (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ authenticated: false });
    }

    res.json({
      authenticated: true,
      user: {
        id: req.user.id,
        role: req.user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};
