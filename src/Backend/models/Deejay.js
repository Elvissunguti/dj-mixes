const mongoose = require("mongoose");


const Deejay = mongoose.Schema({
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Deejay" // Reference to the User model
    }]
});

const DeejayModel = mongoose.model("Deejay", Deejay);

module.exports = DeejayModel;