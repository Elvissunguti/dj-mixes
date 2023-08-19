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
    isFavorite: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now // Set the default value to the current date and time
    },
});

const MixModel = mongoose.model("Mix", Mix);

module.exports = MixModel;

