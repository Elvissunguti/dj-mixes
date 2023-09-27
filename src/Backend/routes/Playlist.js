const express = require("express");
const passport = require("passport");
const router = express.Router();
const Playlist = require("../models/Playlist");
const User = require("../models/User");
const Mix = require("../models/Mix");

router.post("/createPlaylist",
passport.authenticate("jwt", {session: false}), 
async(req, res) => {
    try{

        const userId = req.user._id;

        const newPlaylist = new Playlist({
            name: req.body.name,
            userId: userId,
        });

        newPlaylist.mix = [];
        await newPlaylist.save();

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

        const playlists = await Playlist.find({ userId });

        return res.json({ message: "Playlists fetched successfully", playlists });

    } catch(error){
        console.error("Could nnot fetch playlist", error);
        return res.json({error: "Error fetching playlists"});
    }
})

router.get("/playlistMixes/:playlistId", 
passport.authenticate("jwt", {session: false}),
async(req, res) => {
    try{

     const userId = req.user._id;

     const playlistId = req.params.playlistId;

     const playlist = await Playlist.findOne({ _id: playlistId, userId});

     if(!playlist){
        return res.json({ error: "Playlist not found"})
     }

     const mixIds = playlist.mix;

     const mixes = await Mix.find({ _id: {$in: mixIds}});

     return res.json({ message: "Mixes fetched successfully", mixes });

    } catch(error){
        console.error("Could not fetch songs from playlist", error)
        return res.json({ error: "Error getting mixes from playlist"})
    }
});

router.delete("/deletePlaylistMixes/:playlistId",
passport.authenticate("jwt", {session: false}),
async(req, res) => {
    try{
      const userId = req.user._id;
      const playlistId = req.params.playlistId;

      const playlist = await Playlist.findOne({ _id : playlistId, userId});

      if(!playlist){
        return res.json({error: "Playlist not found"});
      }
      
      const mixesToDelete = req.body.mixesToDelete;

      await Playlist.updateOne(
        { _id: playlistId },
        { $pull: { mix: { $in: mixesToDelete } } }
      );
      
      return res.json({ message: "Mixes deleted from playlist successfully" });

    } catch(error){
        console.error("Could not delete mixes from playlist", error);
        return res.json({ error : "Error deleting mixes from playlist"})
    }
})

module.exports = router