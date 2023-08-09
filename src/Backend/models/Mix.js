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
});

const MixModel = mongoose.model("Mix", Mix);

module.exports = MixModel;

