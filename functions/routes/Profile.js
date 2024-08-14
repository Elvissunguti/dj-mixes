/* eslint-disable */
const express = require("express");
const router = express.Router();
const passport = require("passport");
const Profile = require("../models/Profile");
const User = require("../models/User");

// router to create profile

router.post("/create", 
    passport.authenticate("jwt", {session: false}),
    async (req, res) => {
        
        const userId = req.user._id;
        const { biography, facebookUrl, twitterUrl, instagramUrl, coverPicUrl, profilePicUrl } = req.body;

        if (!biography || !facebookUrl || !twitterUrl || !instagramUrl || !coverPicUrl || !profilePicUrl || !userId){
            return res.json({ error: "unable to upload profile data"})
        }

          // Check if a profile already exists for the user
          const existingProfile = await Profile.findOne({ userId });
           try{
          if (existingProfile) {
          // If a profile exists, update it
              existingProfile.biography = biography;
              existingProfile.facebookUrl = facebookUrl;
              existingProfile.twitterUrl = twitterUrl;
              existingProfile.instagramUrl = instagramUrl;
              existingProfile.coverPic = coverPicUrl;
              existingProfile.profilePic = profilePicUrl;
          
              const updatedProfile = await existingProfile.save();
              return res.json({ message: "Profile updated successfully", updatedProfile });

    } else {
        // If no profile exists, create a new one
           const profileData = { biography, facebookUrl, twitterUrl, instagramUrl, coverPic: coverPicUrl, profilePic: profilePicUrl, userId };
           const createdProfile = await Profile.create(profileData);
           return res.json({ message: "Profile created successfully", createdProfile });
       }
    } catch (error){
        console.error("Error saving profile", error)
            return res.json({ error : "failed to save Profile"})

    }
    } 
);


// router to get profile of the current user
 router.get("/get/profiles",
   passport.authenticate("jwt", { session: false}),
     async (req, res) => {
        try{

            currentUser = req.user._id;

            const userProfile = await Profile.findOne({ userId: currentUser });


              const profileData = {
                userName: req.user.userName,
                coverPic: userProfile ? userProfile.coverPic : null, 
                profilePic: userProfile ? userProfile.profilePic : null,
                
              };

              return res.json({ data:  profileData  });
              
        } catch (error){
            console.error("Error retrieving user Profile", error)
            return res.json({ error: "Failed to retrieve user profile"})
        }
     });

// router to get profile of a user
router.get("/get/artistProfile/:userId",
  passport.authenticate("jwt", {session: false}),
     async (req, res) => {
        try{

            const userId = req.params.userId;

            const artistProfile = await Profile.findOne({ userId: userId })

            const usersUserName = await User.findOne({ _id: userId })

            const profileData = {
                userName: usersUserName ? usersUserName.userName : null, 
                coverPic: artistProfile ? artistProfile.coverPic : null, 
                profilePic: artistProfile ? artistProfile.profilePic : null, 
                biography: artistProfile ? artistProfile.biography : null,
            }
            return res.json({ data: profileData });

        } catch (error){
            console.error("Error retrieving artist Profile", error);
            return res.json({ error: "Failed to retrieve artist profile" })
        };
     });

 module.exports = router;


