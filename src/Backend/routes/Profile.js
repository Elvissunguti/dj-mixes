const express = require("express");
const router = express.Router();
const passport = require("passport");
const { profileUploads } = require("../Middleware/Profile");
const Profile = require("../models/Profile");


router.post("/create",
 passport.authenticate("jwt", { session: false}),
 (req, res) => {
    profileUploads(req, res, async (err) => {

        try{
        if (err) {
            console.log(err);
            return res.json({ error: "Failed to upload files"})
        }

        const userId = req.user._id;

        const coverPic = req.files["coverPic"][0].path;
        const profilePic = req.files["profilePic"][0].path;
        const { biography, facebookUrl, twitterUrl, instagramUrl } = req.body;

        if (!biography || !facebookUrl || !twitterUrl || !instagramUrl || !coverPic || !profilePic || !userId){

            return res.json({ error: "unable to upload profile data"})
        }

        
        const profileData = { biography, facebookUrl, twitterUrl, instagramUrl, coverPic, profilePic, userId};

        
            const createdProfile = await Profile.create(profileData);
            return res.json({ message: "Profile created successfully", createdProfile})
        } catch(error) {
            console.error("Error saving profile", error)
            return res.json({ error : "failed to save Profile"})
        }
    })

 });

// router to get my profile
 router.get("/get/profiles",
   passport.authenticate("jwt", { session: false}),
     async (req, res) => {
        try{

            currentUser = req.user._id;

            const userProfile = await Profile.findOne({ userId: currentUser });

            if (!userProfile) {
                return res.status(404).json({ error: "User profile not found" });
              }

              const profileData = {
                userName: req.user.userName,
                coverPic: userProfile.coverPic.replace("../../../public", ""),
                profilePic: userProfile.profilePic.replace("../../../public", ""),
              };

              return res.json({ data:  profileData  });
              
        } catch (error){
            console.error("Error retrieving user Profile", error)
            return res.json({ error: "Failed to retrieve user profile"})
        }

     })

 module.exports = router;


