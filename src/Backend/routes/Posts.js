const express = require("express");
const router = express.Router()
const passport = require("passport");
const { postUploads } = require("../Middleware/Posts");
const Post = require("../models/Posts");
const User = require("../models/User");


router.post("/create",
 passport.authenticate("jwt", {session: false}),
 (req, res) => {
    postUploads(req, res, async (err) => {
        if (err) {
            return res.json({ error: "Failed to upload files" })
        }

        const image = req.files["image"][0].path;
        const { description } = req.body;

        if (!image || !description){
            return res.json({ error: "unable to create post"})
        }

        const user = req.user.userName;
        const PostDetails = { user, image, description};

        try{
            const createdPost = await Post.create(PostDetails);
            return res.json({ message:"Post Created Successfully", createdPost})
        } catch (error){
            console.error("Error saving post:", error);
            return res.status(500).json({ error: "Failed to save post" });
        };
    });
 });


// get all the posts posted by anyone
router.get("/get/posts/:artistId",
passport.authenticate("jwt", {session: false}),
async (req, res) => {
    const artistId = req.user._id;

    const artist = await User.findOne({ _id: artistId});

    if(!artist){
        return res.json({ error: "Artist does not exist"})
    }

    const posts = await Post.find({ artist: artistId});
    return res.json({data: posts});
})

module.exports = router;