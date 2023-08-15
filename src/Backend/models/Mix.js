const mongoose = require("mongoose");

const Mix = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    track: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        required: true,
        
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" // Reference to the User model
    },
});

const MixModel = mongoose.model("Mix", Mix);

module.exports = MixModel;

