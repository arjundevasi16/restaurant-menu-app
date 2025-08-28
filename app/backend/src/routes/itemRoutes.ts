import { Router } from "express";
import { verifyToken, verifyRole } from "../middlewares/verifyMiddlewares";
import { upload } from "../utils/multerHelper";
import { createItem } from "../controllers/foodItemController";

const router = Router();

router.post(
  "/create",
  verifyToken,
  verifyRole("owner"),
  upload.single("image"),
  createItem
);

export default router;
