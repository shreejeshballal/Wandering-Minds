
import { Router } from "express";
import { fetchHomeBlogs, publishBlog, seachBlogsAndUsers } from "../controllers/blog-controller.js";

const router = Router();

router.post("/create-blog", publishBlog);
router.get("/get-home-blogs", fetchHomeBlogs);
router.get("/search", seachBlogsAndUsers);



export default router;
