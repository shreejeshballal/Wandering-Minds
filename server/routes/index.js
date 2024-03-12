import { Router } from "express";
import UserRoutes from "./UserRoutes.js";

const router = Router();

router.use("/auth", UserRoutes);


export default router;
