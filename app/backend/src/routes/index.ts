import { Router } from "express";
import authRoutes from "./authRoutes";
import tableRoutes from "./tableRoutes";
import restaurantRoutes from "./restaurantRoutes";
import categoryRoutes from "./categoryRoutes";
import itemRoute from "./itemRoutes";
const router = Router();

router.use("/auth", authRoutes);
router.use("/table", tableRoutes);
router.use("/restaurants", restaurantRoutes);
router.use("/categories", categoryRoutes);
router.use("/items", itemRoute);

export default router;
