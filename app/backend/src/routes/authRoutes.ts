import { Router } from "express";
import {
  login,
  logout,
  signup,
  verifyEmail,
  verifyMobile,
  verifyUser,
} from "../controllers/authController";
import { refreshAccessToken } from "../controllers/refreshAccessToken";
import { verifyToken } from "../middlewares/verifyMiddlewares";
const router = Router();

// Auth routes
router.post("/sign", signup);
router.post("/login", login);
router.post("/refresh", refreshAccessToken);
router.get("/verifyEmail", verifyEmail);
router.post("/verifyMobile", verifyMobile);
router.post("/verify-user", verifyToken, verifyUser);
router.post("/logout", logout);
export default router;
