/* eslint-disable */
const mongoose = require("mongoose");

const Post = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    profilePic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile"
    },
    postDate: String,
    postTime: String,
});

const PostModel = mongoose.model("Post", Post);

module.exports = PostModel;