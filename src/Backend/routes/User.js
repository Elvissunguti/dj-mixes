const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
const Mix = require("../models/Mix");


// router to follow a user
router.post("/follow/:userId",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const currentUser = req.user; 
            const userId = req.params.userId;

            // Find the user to follow by their userName
            const userToFollow = await User.findOne({ _id: userId });

            if (!userToFollow) {
                return res.status(404).json({ message: "User not found" });
            }

            // Check if the user is already being followed
            if (currentUser.followedArtist.includes(userToFollow._id)) {
                return res.status(400).json({ message: "You are already following this artist" });
            }

            // Add the artist to the list of followed artists
            currentUser.followedArtist.push(userToFollow._id);
            await currentUser.save();
            console.log({ message: "You are now following the artist"})
            return res.status(200).json({ message: "You are now following the artist" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error following artist" });
        }
    });

    // router to unfollow a user

    router.post("/unfollow/:userId",
    passport.authenticate("jwt", {session: false}),
    async (req, res) => {
        try{

            const currentUser = req.user;
            const userId = req.params.userId;

            // find the user to unfollow by their username
            const userToUnfollow = await User.findOne({ _id: userId });

            if (!userToUnfollow) {
                return res.status(404).json({ message: "User not found" });
            }

                  // Check if the user is being followed
      const artistIndex = currentUser.followedArtist.indexOf(userToUnfollow._id);
      if (artistIndex !== -1) {
        // Remove the artist from the list of followed artists
        currentUser.followedArtist.splice(artistIndex, 1);
        await currentUser.save();
        console.log("You have unfollowed the artist");
        return res.status(200).json({ message: "You have unfollowed the artist" });
      } else {
        return res.status(400).json({ message: "You are not following this artist" });
      }
           

        } catch (error) {
            console.error(error);
            res.json({ message: "Error unfollowing artist" });
        }
    })

    //router to check if a user is followed
    router.get("/checkfollow/:userId",
    passport.authenticate("jwt", { session: false}),
    async (req, res) => {
        try{

            const currentUser = req.user;
            const userId = req.params.userId;

            if (currentUser.followedArtist.includes(userId)) {
                return res.status(200).json({ message: "You are following this artist" });
              } else {
                return res.status(200).json({ message: "You are not following this artist" });
              }

        } catch(error) {
            console.error("Failed to check if the user is followed", error);
            res.json({ message: "Error checking if user is followed"});
        }
    });

    // router to get mixes posted by a followed user
    router.get("/followed-mixes",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const currentUser = req.user;
            
            // Fetch the list of user IDs that the current user is following
            const followedUserIds = currentUser.followedArtist.map(artist => artist._id);
            

            // Find mixes from followed users
            const mixesFromFollowedUsers = await Mix.find({ userId: { $in: followedUserIds } });

            const mixData = mixesFromFollowedUsers.map((mix) => ({
                thumbnail: mix.thumbnail.replace("../../../public", ""),
                title: mix.title,
                artist: mix.artist,
                track: mix.track.replace("../../../public", ""),
                _id: mix._id,
                userId: mix.userId,
            }));

            return res.status(200).json({ data: mixData});
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error fetching mixes" });
        }
    });


    // router to get the latest mix posted by users i have followed
    router.get("/get/newUploads", 
    passport.authenticate("jwt", {session: false}),
     async (req, res) => {
        try{
            const currentUser = req.user;

            const followedUserIds = currentUser.followedArtist.map(artist => artist._id);

            const latestMix = new Date();
            latestMix.setMonth(latestMix.getMonth() -3);

            const latestMixes = await Mix.find({
                 userId: { $in: followedUserIds},
                 createdAt: { $gte: latestMix}}).sort({ createdAt: -1}).populate("artist");

                 const latestData = latestMixes.map((mix) => ({
                    thumbnail: mix.thumbnail.replace("../../../public",""),
                    title: mix.title,
                    artist: mix.artist,
                    track: mix.track.replace("../../../public", ""),
                    userId: mix.userId,
                    _id: mix._id,
                    createdAt: mix.createdAt,
                 }));

                 return res.json({ data: latestData });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error fetching the mixes"})
        }
     });


  

module.exports = router;


