const express = require("express");
const router = express.Router();
const passport = require("passport");
const Mix = require("../models/Mix");
const User = require("../models/User");
const Profile = require("../models/Profile");

router.get("/searchText", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const query = req.query.query.toLowerCase();

    const mixResults = await Mix.find({ title: { $regex: `.*${query}.*`, $options: 'i' } });

    const userResults = await User.find({ userName: { $regex: `.*${query}.*`, $options: 'i' } });

    // Fetch Profile data for users in userResults
    const userIds = userResults.map((user) => user._id);

    const profileResults = await Profile.find({ userId: { $in: userIds } });

    // Create a mapping of userId to ProfilePic for efficient lookup
    const profilePicMap = {};
    profileResults.forEach((profile) => {
      profilePicMap[profile.userId.toString()] = profile.profilePic;
    });

    // Merge userResults with ProfilePic data
    const usersWithProfilePic = userResults.map((user) => {
      return {
        _id: user._id,
        userName: user.userName,
        profilePic: profilePicMap[user._id.toString()] || null, 
      };
    });

    const results = {
      mixes: mixResults,
      users: usersWithProfilePic,
    };

    console.log({ usersWithProfilePic });
    res.json({ data: results });

  } catch (error) {
    console.error("Error searching text", error);
    return res.json({ error: "Error searching the text" });
  }
});

module.exports = router;
