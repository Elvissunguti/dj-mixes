const express = require("express");
const passport = require("passport");
const Mix = require("../models/Mix");
const User = require("../models/User");
const router = express.Router();

router.get("/searchText", 
passport.authenticate("jwt", {session: false}),
async(req, res) => {
    try{
        const query =  req.query.query.toLowerCase();

        const mixResults = await Mix.find({ title: { $regex: `.*${query}.*`, $options: 'i' }})

        const userResults = await User.find({ userName: { $regex: `.*${query}.*`, $options: 'i' } });

        const results = {
            mixes: mixResults,
            users: userResults,
          };

          res.json({ data: results });

    } catch (error) {
        console.error("Error searching text", error);
        return res.json({ error: "Error searching the text"})
    }
})

module.exports = router;