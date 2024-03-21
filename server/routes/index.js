import { Router } from "express";
import UserRoutes from "./user-routes.js";
import BlogRoutes from "./blog-routes.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import { generateUploadURL } from "../utils/upload-url.js";

const router = Router();

router.use("/auth", UserRoutes);
router.use("/", authMiddleware, BlogRoutes)
router.get("/get-upload-url", authMiddleware, async (req, res, next) => {
    console.log("Get upload URL");
    try {
        const uploadURL = await generateUploadURL();
        res.status(200).json({ uploadURL });
    } catch (error) {
        next(error);
    }
});

export default router;
