import { createNewBlog } from "../services/blog-service.js";

export const publishBlog = async (req, res, next) => {
    try {
        const author = req.user;

        console.log(req.body);
        // await createNewBlog(req.body);

        // if (!req.body.draft) {
        //     await incrementBlogCount(author);
        // }

        return res.status(201).json({
            status: "Success",
            message: "Blog created successfully",
        });

    } catch (err) {
        next(err);
    }
}
