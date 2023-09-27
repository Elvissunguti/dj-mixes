const express = require("express");
const passport = require("passport");
const router = express.Router();
const Playlist = require("../models/Playlist");
const User = require("../models/User");

router.post("/createPlaylist",
passport.authenticate("jwt", {session: false}), 
async(req, res) => {
    try{

        const userId = req.user._id;

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
async (req, res) => {
    try{

        const playlistName = req.body.name;

        const mixId = req.body._id;

        const playlist = await Playlist.findOne({ name: playlistName });

        if(!playlist){
            return res.json({ error: "Playlist not found"})
        }

        playlist.mix.push(mixId);
        await playlist.save();

        return res.json({ message: "Mix added to playlist successfully", playlist });

    } catch (error){
        console.error("Could not add to playlist", error);
        return res.json({error: "Error adding to playlist"});
    }

});

router.get("/get/playlist",
passport.authenticate("jwt", {session: false}), 
async(req, res) => {
    try{

        const userId = req.user._id;

        const user = await User.findOne(userId).populate("playlists");

        if (!user) {
            return res.json({ error: "User not found" });
        }

        const playlists = user.playlists;

        return res.json({ message: "Playlists fetched successfully", playlists });

    } catch(error){
        console.error("Could nnot fetch playlist", error);
        return res.json({error: "Error fetching playlists"});
    }
})

router.get("/playlistMixes", 
passport.authenticate("jwt", {session: false}),
async(req, res) => {
    try{

    

    } catch(error){
        console.error("Could not fetch songs from playlist")
        return res.json({ error: "Error getting mixes from playlist"})
    }
})

module.exports = router