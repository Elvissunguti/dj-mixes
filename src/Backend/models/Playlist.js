const mongoose = require("mongoose");


const Playlist = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    userId:{
        type: String,
        required: true
    },
    mix: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Mix",
        },
    ],
    mixCount: {
        type: Number,
        default: 0,
    },
});

const PlaylistModel = mongoose.model("Playlist", Playlist);

module.exports = PlaylistModel;