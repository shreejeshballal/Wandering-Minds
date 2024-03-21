import Blog from "../models/Blog.js";
import User from "../models/User.js";

export const createNewBlog = async (data) => {
    const newBlog = await Blog.create(data);
    return newBlog;
}

export const incrementBlogCount = async (author) => {
    await User.findByIdAndUpdate(author, {
        $inc: { "account_info.total_blogs": 1 }
    });

}