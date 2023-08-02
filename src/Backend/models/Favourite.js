const mongoose = require("mongoose");


const Favourite = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    mix: {
        type: mongoose.Types.ObjectId,
        ref: "Mix",
        required: true,
    },
});


const FavouriteModel = mongoose.model("Favourite", Favourite);

module.exports = FavouriteModel;
