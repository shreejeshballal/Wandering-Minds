
import { Router } from "express";
import { fetchHomeBlogs, publishBlog } from "../controllers/blog-controller.js";

const router = Router();

router.post("/create-blog", publishBlog);
router.get("/get-home-blogs", fetchHomeBlogs);



export default router;
