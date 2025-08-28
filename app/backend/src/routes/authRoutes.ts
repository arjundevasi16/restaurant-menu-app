import { Router } from "express";
import { login, signup } from "../controllers/authController";
const router = Router();

// Auth routes
router.post("/sign", signup);
router.post("/login", login);

export default router;
