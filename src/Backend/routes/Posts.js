const express = require("express");
const router = express.Router()
const passport = require("passport");
const { postUploads } = require("../Middleware/Posts");
const Post = require("../models/Posts");




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
        const userId = req.user._id;
        const PostDetails = { user, image, description, userId};

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
router.get("/get/posts",
passport.authenticate("jwt", {session: false}),
async (req, res) => {
    try{

        const currentUser = req.user;

        const followedUserIds = currentUser.followedArtist.map(artist => artist._id)
        console.log(followedUserIds);

        const postFromFollowedUsers = await Post.find({ userId: { $in: followedUserIds } });
        console.log("Error fetching data:", postFromFollowedUsers);

        const postData = postFromFollowedUsers.map((post) => ({
            user: post.user,
            image: post.image.replace("../../../public", ""),
            description: post.description,
        }));

        res.json({ data: postData });


    } catch(error) {
        console.log(error);
        res.json({ error: "Could not fetch the posts"})
    }
})

module.exports = router;