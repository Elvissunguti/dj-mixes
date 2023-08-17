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
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
});

const PostModel = mongoose.model("Post", Post);

module.exports = PostModel;