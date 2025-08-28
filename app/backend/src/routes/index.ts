import { Router } from "express";
import authRoutes from "./authRoutes";
import restaurantRoutes from "./restaurantRoutes";
import categoryRoutes from "./categoryRoutes";
import itemRoute from "./itemRoutes";
const router = Router();

router.use("/auth", authRoutes);
router.use("/restaurants", restaurantRoutes);
router.use("/categories", categoryRoutes);
router.use("/items", itemRoute);

export default router;
