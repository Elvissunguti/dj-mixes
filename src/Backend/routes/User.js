const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
const Mix = require("../models/Mix");


// router to follow a user
router.post("/follow/:userNameToFollow",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const currentUser = req.user; // Assuming you have middleware to get the entire authenticated user
            const userNameToFollow = req.params.userNameToFollow;

            console.log("Current User:", currentUser); // Add this line to log currentUser
            console.log("User to Follow:", userNameToFollow); // Add this line to log userNameToFollow

            // Find the user to follow by their userName
            const userToFollow = await User.findOne({ userName: userNameToFollow });

            console.log("User to Follow Document:", userToFollow); // Add this line to log userToFollow

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

            return res.status(200).json({ message: "You are now following the artist" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error following artist" });
        }
    });

    // router to unfollow a user

    router.post("/unfollow/:userNameToUnfollow",
    passport.authenticate("jwt", {session: false}),
    async (req, res) => {
        try{

            const currentUser = req.user;
            const userNameToUnfollow = req.params.userNameToUnfollow;

            console.log("Current User:", currentUser);
            console.log("User to unfollow:", userNameToUnfollow);

            // find the user to unfollow by their username
            const userToUnfollow = await User.findOne({ userName: userNameToUnfollow});

            console.log("User to Unfollow Document:", userToUnfollow);

            if (!userToUnfollow) {
                return res.status(404).json({ message: "User not found" });
            }

            // Check if the user is being followed
            if (!currentUser.followedArtist.includes(userToUnfollow._id)) {
                return res.status(400).json({ message: "You are not following this artist" });
            }

            // Remove the artist from the list of followed artists
            currentUser.followedArtist = currentUser.followedArtist.filter(id => id !== userToUnfollow._id);
            await currentUser.save();

            return res.status(200).json({ message: "You have unfollowed the artist" });

        } catch (error) {
            console.error(error);
            res.json({ message: "Error unfollowing artist" });
        }
    })

    // router to get mixes posted by a followed user
    router.get("/followed-mixes",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const currentUser = req.user;
            
            // Fetch the list of user IDs that the current user is following
            const followedUserIds = currentUser.followedArtist.map(artist => artist._id);
            console.log("Followed User IDs:", followedUserIds);

            // Find mixes from followed users
            const mixesFromFollowedUsers = await Mix.find({ userId: { $in: followedUserIds } });

            const mixData = mixesFromFollowedUsers.map((mix) => ({
                thumbnail: mix.thumbnail.replace("../../../public", ""), 
                title: mix.title,
                artist: mix.artist,
                track: mix.track,
            }));

            return res.status(200).json({ data: mixData});
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error fetching mixes" });
        }
    });


  

module.exports = router;


