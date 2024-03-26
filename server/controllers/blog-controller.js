import { createNewBlog, fetchBlogs, incrementBlogCount } from "../services/blog-service.js";

export const publishBlog = async (req, res, next) => {
    try {
        const author = req.user;
        await createNewBlog({ ...req.body, author });

        if (!req.body.draft) {
            await incrementBlogCount(author);
        }

        return res.status(201).json({
            status: "Success",
            message: "Blog created successfully",
        });

    } catch (err) {
        next(err);
    }
}


export const fetchHomeBlogs = async (req, res, next) => {
    try {
        const page = req.query.page || 1;
        const category = req.query.category || null;
        let latestBlogs = await fetchBlogs("latest", category, page);
        let trendingBlogs = await fetchBlogs("trending", category);

        latestBlogs = latestBlogs.map(blog => {
            let { author, ...rest } = blog._doc;
            const { profile_img, ...restAuthor } = author.personal_info;
            return { ...rest, ...restAuthor, userImage: profile_img }
        });
        trendingBlogs = trendingBlogs.map(blog => {
            let { author, ...rest } = blog._doc;
            const { profile_img, ...restAuthor } = author.personal_info;
            return { ...rest, ...restAuthor, userImage: profile_img }
        });



        return res.status(200).json({
            status: "Success",
            message: "Latest blogs fetched successfully",
            data: { latestBlogs, trendingBlogs },
        });

    } catch (err) {
        next(err);
    }
}