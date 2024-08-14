/* eslint-disable */
const mongoose = require("mongoose");

const Profile = new mongoose.Schema({
    coverPic:{
        type: String,
        required: true,
    },
    profilePic:{
        type: String,
        required: true,
    },
    biography: {
        type: String,
        required: true,
    },
    facebookUrl:{
        type: String,
        required: true,
    },
    twitterUrl:{
        type: String,
        required: true,
    },
    instagramUrl:{
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

const ProfileModel = mongoose.model("Profile", Profile);

module.exports = ProfileModel;