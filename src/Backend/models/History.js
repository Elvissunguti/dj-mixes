const mongoose = require("mongoose");


const History = new mongoose.Schema({
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


const HistoryModel = mongoose.model("History", History);

module.exports = HistoryModel;
