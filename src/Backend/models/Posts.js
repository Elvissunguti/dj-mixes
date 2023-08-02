const mongoose = require("mongoose");

const Post = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
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
    createdAt: {
        type: Date,
        default : Date.now,
    }
});

const PostModel = mongoose.model("Post", Post);

module.exports = PostModel;