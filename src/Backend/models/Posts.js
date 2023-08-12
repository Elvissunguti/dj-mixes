const mongoose = require("mongoose");

const Post = mongoose.Schema({
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
});

const PostModel = mongoose.model("Post", Post);

module.exports = PostModel;