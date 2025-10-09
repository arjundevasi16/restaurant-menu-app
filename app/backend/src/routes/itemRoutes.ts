import { Router } from "express";
import { verifyToken, verifyRoles } from "../middlewares/verifyMiddlewares";
import { upload } from "../utils/multerHelper";
import {
  createItem,
  getItems,
  addItemInCategory,
  addItemToRestaurant,
} from "../controllers/foodItemController";

const router = Router();

router.post(
  "/create",
  verifyToken,
  verifyRoles("owner"),
  upload.single("image"),
  createItem
);
router.get("/", getItems);

export default router;
router.post(
  "/add-to-category",
  verifyToken,
  verifyRoles("owner"),
  addItemInCategory
);
router.post(
  "/add-to-restaurant",
  verifyToken,
  verifyRoles("owner"),
  addItemToRestaurant
);
