const mongoose = require("mongoose");


const User = new mongoose.Schema({
    userName: { 
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    followedArtist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    favouredMixes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mix"
    }]
});

const UserModel = mongoose.model("User", User);

module.exports = UserModel;