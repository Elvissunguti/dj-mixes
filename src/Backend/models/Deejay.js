const mongoose = require("mongoose");


const Deejay = mongoose.Schema({
    name: {
        type : String,
        required: true,

    }
});

const DeejayModel = mongoose.model("Deejay", Deejay);

module.exports = DeejayModel;