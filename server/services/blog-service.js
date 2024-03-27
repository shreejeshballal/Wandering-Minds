import User from "../models/User.js";
import Blog from "../models/Blog.js";

export const createNewBlog = async (data) => {
    const newBlog = await Blog.create(data);
    await User.findByIdAndUpdate(data.author, {
        $push: { blogs: newBlog._id }
    });
    return newBlog;
}

export const incrementBlogCount = async (author) => {
    await User.findByIdAndUpdate(author, {
        $inc: { "account_info.total_posts": 1 }
    });

}
export const fetchBlogs = async (type, category, page) => {

    switch (type) {
        case "latest": {
            const catQuery = category ? { tags: { $in: [category] } } : null
            const latestBlogs = await Blog.find(
                { draft: false, ...catQuery }
            )
                .populate("author", "personal_info.profile_img personal_info.username  -_id")
                .sort({ createdAt: -1 })
                .select("_id title des banner activity tags createdAt")
                .skip((page - 1) * 10)
                .limit(10)

            return latestBlogs;
        }
        case "trending": {
            const catQuery = category ? { tags: { $in: [category] } } : null
            const trendingBlogs = await Blog.find(
                { draft: false, ...catQuery }
            )
                .populate("author", "personal_info.profile_img personal_info.username -_id")
                .sort({ total_reads: -1, total_likes: -1, createdAt: -1, })
                .select("_id title  createdAt")
                .limit(5)

            return trendingBlogs;
        }
    }
}

export const countBlogs = async (type, category) => {
    switch (type) {
        case "latest": {
            const catQuery = category ? { tags: { $in: [category] } } : null
            const count = await Blog.countDocuments({ draft: false, ...catQuery });
            return count;
        }
    }
}