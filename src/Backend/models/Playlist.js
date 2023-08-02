const mongoose = require("mongoose");


const Playlist = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
   
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    // 1. Playlist mein songs kaunse hain
    // 2. Playlist collaborators
    mix: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Mix",
        },
    ],
});

const PlaylistModel = mongoose.model("Playlist", Playlist);

module.exports = PlaylistModel;