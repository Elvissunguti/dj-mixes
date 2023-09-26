const express = require("express");
const passport = require("passport");
const router = express.Router();
const Playlist = require("../models/Playlist");
const User = require("../models/User");

router.post("/createPlaylist",
passport.authenticate("jwt", {session: false}), 
async(req, res) => {
    try{

        const userId = req.body._id;

        const newPlaylist = new Playlist({
            name: req.body.name
        });

        newPlaylist.mix = [];
        await newPlaylist.save();

        const user = await User.findByIdAndUpdate(
            userId,
            { $push: { playlists: newPlaylist._id } },
            { new: true }
        )

        return res.json({ message: "Playlist created successfully", playlist: newPlaylist });

    } catch (error){
        console.error("Could not create playlist", error);
        return res.json({ error: "Error creating a playlist"});
    }
})

router.post("/addPlaylist",
passport.authenticate("jwt", {session: false}), 
async ( req, res) => {
    try{

    } catch (error){
        console.error("Could not add to playlist", error);
        return res.json({error: "Error adding to playlist"});
    }

})



module.exports = router