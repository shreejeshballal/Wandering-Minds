import { Router } from "express";
import {
    registerUser,
    loginUser,
    validateUser,
    logoutUser,
    // googleAuth,
} from "../controllers/UserController.js";
import { authMiddleware } from "../middleware/AuthMiddleware.js";
const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/validate/:id", authMiddleware, validateUser);
router.get("/logout", logoutUser);


export default router;
