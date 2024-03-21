
import { Router } from "express";
import { publishBlog } from "../controllers/blog-controller.js";

const router = Router();

router.post("/create-blog", publishBlog);


export default router;
