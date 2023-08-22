const mongoose = require("mongoose");


const Favourite = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
        
    },
    mix: {
        type: mongoose.Types.ObjectId,
        ref: "Mix"
        
    },
});


const FavouriteModel = mongoose.model("Favourite", Favourite);

module.exports = FavouriteModel;
