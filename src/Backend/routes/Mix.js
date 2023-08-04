const express = require("express");
const router = express.Router();
const Mix = require("../models/Mix");
const passport = require("passport");
const multer = require("multer"); // Require multer for file uploads
const path = require("path");


// ... (existing code up to multer configurations)

const mixStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "thumbnail") {
      cb(null, path.join(__dirname, "../../Components/Assets/MixUploads/Thumbnail"));
    } else if (file.fieldname === "track") {
      cb(null, path.join(__dirname, "../../Components/Assets/MixUploads/Tracks"));
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
      const artist = req.user._id;
      const MixDetails = { title, thumbnail, track, artist };
     
      
      try {
        // Assuming the Mix model has a method named "create" to save the mix
        const createdMix = await Mix.create(MixDetails);
        return res.status(200).json(createdMix);
      } catch (error) {
        console.error("Error saving mix:", error);
        return res.status(500).json({ error: "Failed to save mix" });
      }
    });
  }
);

module.exports = router;




