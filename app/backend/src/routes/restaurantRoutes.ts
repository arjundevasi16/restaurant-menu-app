import { Router } from "express";
import {
  createRestaurant,
  getAllRestaurants,
} from "../controllers/restaurantController";
import { verifyToken, verifyRole } from "../middlewares/verifyMiddlewares";
import { upload } from "../utils/multerHelper";

const router = Router();

router.get("/", getAllRestaurants);
router.post(
  "/create",
  verifyToken,
  verifyRole("owner"),
  upload.single("image"),
  createRestaurant
);
export default router;
