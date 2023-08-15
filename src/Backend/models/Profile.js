const mongoose = require("mongoose");

const Profile = mongoose.Schema({
    userName :{
        type: String,
        required: true,
    },
    coverImage:{
        type: String,
        required: true,
    },
    profilePic:{
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
    }
});

const ProfileModel = mongoose.model("Profile", Profile);

module.exports = ProfileModel;