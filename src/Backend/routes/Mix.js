const express = require("express");
const router = express.Router();
const Mix = require("../models/Mix");
const passport = require("passport");
const multer = require("multer"); // Require multer for file uploads
const path = require("path");
const User = require("../models/User");



const mixStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "thumbnail") {
      cb(null, path.join(__dirname, "../../../public/MixUploads/Thumbnail"));
    } else if (file.fieldname === "track") {
      cb(null, path.join(__dirname, "../../../public/MixUploads/Tracks"));
    } else {
      // Handle other file uploads if needed
      cb(new Error("Invalid fieldname"), null);
    }
  },
  filename: (req, file, cb) => {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, uniquePrefix + extension);
  },
});

const mixUpload = multer({ storage: mixStorage }).fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "track", maxCount: 1 },
  // Add more fields if needed for other file uploads
]);


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

      if (!title || !thumbnail || !track) {
        return res.status(400).json({ error: "Unable to create mix" });
      }

      // Rest of the code to create the mix
      const artist = req.user.userName;
      const MixDetails = { title, thumbnail, track, artist, userId: req.user._id };
     
      
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

// Route to toggle the favourite status of a mix
router.put("/toggleFavourite",
passport.authenticate('jwt',{session :false}),
async (req ,res) => {
  try{
    const mixId = req.body.mixId;

    if (!mixId) {
      return res.status(400).json({ error: "Missing mixId in request body" });
    }

    const mix = await Mix.findById(mixId);

    if (!mix) {
      return res.status(404).json({ error: "Mix not found" });
    }

    const updatedFavoriteStatus = !mix.isFavorite;
    mix.isFavorite = updatedFavoriteStatus;

    // Deduct from or add to favoriteCount based on updatedFavoriteStatus
    const favoriteCountModifier = updatedFavoriteStatus ? 1 : -1;
    mix.favoriteCount += favoriteCountModifier;

    await mix.save();

    return res.status(200).json({ message: "Toggled favorite status", mix });


  } catch(error){
    console.error(error);
    return res.json({ error: "Failed to toggle favourite icon"})
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




