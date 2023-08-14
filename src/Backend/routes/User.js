const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");

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

module.exports = router;


