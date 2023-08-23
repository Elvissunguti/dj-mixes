const mongoose = require("mongoose");


const Favourite = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
        
    },
    mixId: {
        type: mongoose.Types.ObjectId,
        ref: "Mix"
        
    },
});


const FavouriteModel = mongoose.model("Favourite", Favourite);

module.exports = FavouriteModel;
