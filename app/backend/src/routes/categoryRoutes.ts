import { Router } from "express";
import {
  createCategory,
  getCategoriesByRestaurant,
} from "../controllers/categoryController";
import { verifyToken, verifyRoles } from "../middlewares/verifyMiddlewares";
import { upload } from "../utils/multerHelper";
import { getItemsByCategory } from "../controllers/foodItemController";
const router = Router();
// createCategory
router.post(
  "/create",
  verifyToken,
  verifyRoles("owner"),
  upload.single("image"),
  createCategory
);
router.get("/:restaurantId", getCategoriesByRestaurant);
router.get("/:categoryId/items", getItemsByCategory);

export default router;
