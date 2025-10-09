import { Router } from "express";
import {
  createRestaurant,
  getAllRestaurants,
  getOwnerRestaurants,
} from "../controllers/restaurantController";
import { verifyToken, verifyRoles } from "../middlewares/verifyMiddlewares";
import { upload } from "../utils/multerHelper";

const router = Router();

router.get("/", getAllRestaurants);
router.get("/mine", verifyToken, verifyRoles("owner"), getOwnerRestaurants);
router.post(
  "/create",
  verifyToken,
  verifyRoles("owner"),
  upload.single("image"),
  createRestaurant
);
export default router;
