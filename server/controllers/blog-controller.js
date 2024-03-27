import { countBlogs, createNewBlog, fetchBlogs, findBlogs, incrementBlogCount } from "../services/blog-service.js";
import { findUsers } from "../services/user-service.js";

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
        const skip = req.query.skip || 0;
        const category = req.query.category || null;
        let latestBlogs = await fetchBlogs("latest", category, skip);
        let trendingBlogs = await fetchBlogs("trending", category);
        const latestBlogCount = await countBlogs("latest", category);

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
            data: { latestBlogs, trendingBlogs, latestBlogCount },
        });

    } catch (err) {
        next(err);
    }
}

export const seachBlogsAndUsers = async (req, res, next) => {
    try {
        const { q: query } = req.query;

        let blogs = await findBlogs(query);
        blogs = blogs.map(blog => {
            let { author, ...rest } = blog._doc;
            const { profile_img, ...restAuthor } = author.personal_info;
            return { ...rest, ...restAuthor, userImage: profile_img }
        });

        let users = await findUsers(query);
        users = users.map(user => {
            const { personal_info, _id } = user;
            return { ...personal_info, userImage: personal_info.profile_img, _id }
        });

        return res.status(200).json({
            status: "Success",
            message: "Search results fetched successfully",
            data: { blogs, users }
        });

    } catch (err) {
        next(err);
    }
}