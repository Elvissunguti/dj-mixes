const mongoose = require("mongoose");


const Playlist = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    mix: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Mix",
        },
    ],
});

const PlaylistModel = mongoose.model("Playlist", Playlist);

module.exports = PlaylistModel;