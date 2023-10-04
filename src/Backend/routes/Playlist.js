const express = require("express");
const passport = require("passport");
const router = express.Router();
const Playlist = require("../models/Playlist");
const Mix = require("../models/Mix");

// create a playlist
router.post("/createPlaylist",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const userId = req.user._id;
      const mixId = req.body.mixId; 
      const playlistName = req.body.name

      const newPlaylist = new Playlist({
        name: playlistName,
        userId: userId,
        mix: [mixId],
        
      });

      await newPlaylist.save();

      return res.json({ message: "Playlist created successfully", playlist: newPlaylist });
    } catch (error) {
      console.error("Could not create playlist", error);
      return res.json({ error: "Error creating a playlist" });
    }
  }
);


//  add a mix to a playlist
router.post("/addPlaylist",
passport.authenticate("jwt", {session: false}), 
async (req, res) => {
    try{

        const playlistId = req.body.playlistId;

        const mixId = req.body._id;

        const playlist = await Playlist.findOne({ _id: playlistId });

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

// get playlist of the current user
router.get("/get/playlist",
passport.authenticate("jwt", {session: false}), 
async(req, res) => {
    try{

        const userId = req.user._id;

        const playlists = await Playlist.find({ userId }).populate("mix");

        const playlistsWithMixCounts = playlists.map((playlist) => {
            return {
              _id: playlist._id,
              name: playlist.name,
              mixCount: playlist.mix.length,
              userName: req.user.userName,
            };
          })

        return res.json({ data:  playlistsWithMixCounts });

    } catch(error){
        console.error("Could not fetch playlist", error);
        return res.json({error: "Error fetching playlists"});
    }
});

// Get songs in a playlist
router.get("/playlistMixes/:playlistId", 
passport.authenticate("jwt", {session: false}),
async(req, res) => {
    try{

     const userId = req.user._id;

     const playlistId = req.params.playlistId;

     const playlist = await Playlist.findOne({ _id: playlistId, userId});

     const playlistName = playlist.name;
     const playlistID = playlist._id;

     if(!playlist){
        return res.json({ error: "Playlist not found"})
     }

     const mixIds = playlist.mix;

     const mixes = await Mix.find({ _id: {$in: mixIds}});

     const mixData = mixes.map((mix) => ({
        thumbnail: mix.thumbnail.replace("../../../public", ""), 
        track: mix.track.replace("../../../public", ""),
        title: mix.title,
        artist: mix.artist,
        track: mix.track,
        _id: mix._id,
        userId: mix.userId,
    }));

     const playlistInfo = {
        playlistName,
        playlistID,
        mixData
     }

     return res.json({  data: playlistInfo });

    } catch(error){
        console.error("Could not fetch songs from playlist", error)
        return res.json({ error: "Error getting mixes from playlist"})
    }
});


// router to delete a single mix from the playlist
router.delete("/deletePlaylistMix/:playlistId/:mixId",
passport.authenticate("jwt", {session: false}),
async (req, res) => {
    try{

        const playlistId = req.params.playlistId;
        const mixId = req.params.mixId;

        const playlist = await Playlist.findById(playlistId);

        if (!playlist){
            return res.json({ error: "Playlist not found"})
        };

        const mixIndex = playlist.mix.findIndex((mix) => mix.toString() === mixId);

        if (mixIndex === -1){
            return  res.json({ error: "Mix not found in the playlist"})
        };

        playlist.mix.splice(mixIndex, 1);

        await playlist.save();

        return res.json({ message: "Mix deleted successfully from the playlist" });

    } catch(error) {
        console.error("Could not delete the mix from playlist", error);
        return res.json({ error: "Error deleting a Mix from playlist"})
    }
})


// delete a playlist
router.delete("/deletePlaylist/:playlistId",
passport.authenticate("jwt", {session: false}),
async(req, res) => {
    try{

        const userId = req.user._id;

        const playlistId = req.params.playlistId;

        const playlist = await Playlist.findOne({ _id: playlistId, userId});

        if(!playlist){
            return res.json({ error: "Playlist not found"})
        };

        await Playlist.deleteOne({ _id: playlistId});

        return res.json({ message: "Playlist deleted successfully" });

    } catch(error){
        console.error("Could not delete Playlist", error);
        return res.json({ message: "Error deleting playlist"});
    }
});

module.exports = router