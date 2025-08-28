import { Router } from "express";
import {
  createCategory,
  getCategoriesByRestaurant,
} from "../controllers/categoryController";
import { verifyToken, verifyRole } from "../middlewares/verifyMiddlewares";
import { upload } from "../utils/multerHelper";
const router = Router();
// createCategory
router.post(
  "/create",
  verifyToken,
  verifyRole("owner"),
  upload.single("image"),
  createCategory
);
router.get("/:restaurantId", getCategoriesByRestaurant);

export default router;
