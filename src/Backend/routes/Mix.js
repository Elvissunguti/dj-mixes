const express = require("express");
const router = express.Router();
const Mix = require("../models/Mix");
const passport = require("passport");
const User = require("../models/User");
const { mixUpload } = require("../Middleware/Mix");



// router to create a Mix
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    mixUpload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: "Failed to upload files" });
      }

      const { title } = req.body;
      const thumbnail = req.files["thumbnail"][0].path;
      const track = req.files["track"][0].path;
      const favouritedBy = [];

      if (!title || !thumbnail || !track) {
        return res.status(400).json({ error: "Unable to create mix" });
      }

      // Rest of the code to create the mix
      const artist = req.user.userName;
      const MixDetails = { title, thumbnail, track, artist, userId: req.user._id, favouritedBy };
     
      
      try {
        // Assuming the Mix model has a method named "create" to save the mix
        const createdMix = await Mix.create(MixDetails);
        return res.status(200).json({ message: "Created Mix Successfully", createdMix})
      } catch (error) {
        console.error("Error saving mix:", error);
        return res.status(500).json({ error: "Failed to save mix" });
      }
    });
  }
);


//router to Like a mix
router.post("/addFavourite",
passport.authenticate("jwt", { session: false}),
async ( req, res ) => {
  try {
    const mixId = req.body.mixId;
    const userId = req.user._id;

    // Find the mix and user
    const mix = await Mix.findById(mixId);
    const user = await User.findById(userId);

    if (!mix || !user) {
      return res.status(404).json({ message: "Mix or user not found" });
    }

    // Check if the user has already liked the mix
    const alreadyLiked = mix.favouritedBy.includes(userId);

    if (alreadyLiked) {
      return res.status(400).json({ message: "Mix is already liked by the user" });
    }

    // Update mix and user arrays
    mix.favouritedBy.push(userId);
    mix.favouriteCount++;
    user.favouredMixes.push(mixId);

    await mix.save();
    await user.save();

    return res.status(200).json({ message: "Mix liked successfully", favouriteCount: mix.favouriteCount });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//route to  Unlike a mix
router.post("/deleteFavourite",
passport.authenticate("jwt", { session: false}),
async ( req, res ) => {

  try {
    const mixId = req.body.mixId;
    const userId = req.user._id;

    // Find the mix and user
    const mix = await Mix.findById(mixId);
    const user = await User.findById(userId);

    if (!mix || !user) {
      return res.status(404).json({ message: "Mix or user not found" });
    }

    // Check if the user has liked the mix
    const likedIndex = mix.favouritedBy.indexOf(userId);

    if (likedIndex === -1) {
      return res.status(400).json({ message: "Mix is not liked by the user" });
    }

    // Update mix and user arrays
    mix.favouritedBy.splice(likedIndex, 1);
    mix.favouriteCount--;
    user.favouredMixes.pull(mixId);

    await mix.save();
    await user.save();

    return res.status(200).json({ message: "Mix unliked successfully", favouriteCount: mix.favouriteCount });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});



// Router to get all the Mix I liked
router.get("/favourited",
passport.authenticate("jwt", {session: false}),
async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you have user information in req.user
    const likedMixes = await Mix.find({ favouritedBy: userId }).exec();
    
    const mixData = likedMixes.map((mix) => ({
      thumbnail: mix.thumbnail.replace("../../../public", ""), 
      title: mix.title,
      artist: mix.artist,
      track: mix.track,
      _id: mix._id,
      userId: mix.userId,
  }));

  return res.status(200).json({ data: mixData});
  
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch liked mixes" });
  }
});


// get route to get all the mix i have posted
router.get(
  "/get/myMix",
  passport.authenticate("jwt", {session: false}),
  async (req, res) => {
    try {
      // Retrieve mixes where artist matches the currently authenticated user
      const mixes = await Mix.find({ artist: req.user.userName }).populate("artist");
      
      // Map the retrieved data to include thumbnail, title, and artist
      const mixData = mixes.map((mix) => ({
          thumbnail: mix.thumbnail.replace("../../../public", ""), 
          title: mix.title,
          artist: mix.artist,
          track: mix.track,
          userId: mix.userId,
          createdAt: mix.createdAt,
      }));

      return res.status(200).json({ data: mixData });
  } catch (error) {
      console.error("Error fetching mixes:", error);
      return res.status(500).json({ error: "Failed to fetch mixes" });
  }
  });



   // get route to get any mix anybody has posted
   router.get("/get/artist/:artistId",
   passport.authenticate("jwt", {session: false}), 
   async (req, res) => {
    const artistId = req.user._id;

    const artist = await User.findOne({ _id: artistId});

    if(!artist){
      return res.json({err: "Artist does not exist"})
    }

    const mixes = await Mix.find({ artist: artistId});
    return res.json({data: mixes})
   });
   
   // get router to get a mix by name
   router.get("/get/title/:title",
   passport.authenticate("jwt", { session: false }),
   async (req, res) => {
    const mixTitle = req.params.title;

    try {
      const mixes = await Mix.find({ title: mixTitle }).populate("artist");
      return res.json({ data: mixes });
    } catch (error) {
      console.error("Error fetching mixes:", error);
      return res.status(500).json({ error: "Failed to fetch mixes" });
    }
   });

   


module.exports = router;




