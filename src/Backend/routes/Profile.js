const express = require("express");
const router = express.Router();
const passport = require("passport");
const { profileUploads } = require("../Middleware/Profile");
const Profile = require("../models/Profile");

router.post("/create",
 passport.authenticate("jwt", { session: false}),
 (req, res) => {
    profileUploads(req, res, async (err) => {
        if (err) {
            console.log(err);
            return res.json({ error: "Failed to upload files"})
        }

        const coverImage = req.files["coverImage"][0].path;
        const profilePic = req.files["profilePic"][0].path;
        const { description } = req.body;

        if (!coverImage || !profilePic || !description){

            return res.json({ error: "unable to upload profile data"})
        }

        const userName = req.user.userName;
        const profileData = { userName, coverImage, profilePic, description};

        try{
            const createdProfile = await Profile.create(profileData);
            return res.json({ message: "Profile created successfully", createdProfile})
        } catch(error) {
            console.error("Error saving profile", error)
            return res.json({ error : "failed to save Profile"})
        }
    })

 })

 module.exports = router;


