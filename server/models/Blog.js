import mongoose, { Schema } from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: ["Title is required", true],
    },
    banner: {
        type: String,
        required: ["Banner is required", true],

    },
    des: {
        type: String,
        maxlength: 200,
        required: ["Description is required", true],

    },
    content: {
        type: [],
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    activity: {
        total_likes: {
            type: Number,
            default: 0
        },
        total_comments: {
            type: Number,
            default: 0
        },
        total_reads: {
            type: Number,
            default: 0
        },
        total_parent_comments: {
            type: Number,
            default: 0
        },
    },
    comments: {
        type: [Schema.Types.ObjectId],
        ref: 'comments'
    },
    draft: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

});
const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
export default Blog;