const express = require("express");
const router = express.Router()
const passport = require("passport");
const { postUploads } = require("../Middleware/Posts");
const Post = require("../models/Posts");
const moment = require("moment");
const Profile = require("../models/Profile");



router.post("/create",
 passport.authenticate("jwt", {session: false}),
 (req, res) => {
    postUploads(req, res, async (err) => {
        try{
        if (err) {
            return res.json({ error: "Failed to upload files" })
        }

        const image = req.files["image"][0].path;
        const { description } = req.body;

        if (!image || !description){
             res.json({ error: "unable to create post"})
        }

        const user = req.user.userName;
        const userId = req.user._id;
        const createdAt = new Date(); 
        const postDate = moment(createdAt).format("YYYY-MM-DD");
        const postTime = moment(createdAt).format("HH:mm");
        const PostDetails = { user, image, description, userId, postDate, postTime };
        
        const createdPost = await Post.create(PostDetails);
        return res.json({ message:"Post Created Successfully", createdPost});
        } catch (error){
            console.error("Error saving post:", error);
            res.status(500).json({ error: "Failed to save post" });
        };
    });
 });


// get all the posts posted by anyone
router.get("/get/posts",
passport.authenticate("jwt", {session: false}),
async (req, res) => {
    try{

        const currentUser = req.user;

        const followedUserIds = currentUser.followedArtist.map(artist => artist._id);

        const postsFromFollowedUsers = await Post.find({ userId: { $in: followedUserIds } });

        const postData = [];

        // Iterate through posts and retrieve profilePics
        for (const post of postsFromFollowedUsers) {
            // Find the profile for the user who made the post
            const userProfile = await Profile.findOne({ userId: post.userId });
            console.log("User Profile:", userProfile);

            // Get the profilePic from the user's profile
            const profilePic = userProfile ? userProfile.profilePic : null;

            postData.push({
                user: post.user,
                image: post.image.replace("../../../public", ""),
                description: post.description,
                postDate: post.postDate,
                postTime: post.postTime,
                profilePic: profilePic ? profilePic.replace("../../../public", "") : null,
            });
        }
        console.log(postData);
        return res.json({ data: postData });
        


    } catch(error) {
        console.log(error);
        res.json({ error: "Could not fetch the posts"})
    }
})

router.delete("/deletePost/:postId", 
passport.authenticate("jwt", { session: false}),
async(req, res) => {
    try {
        const userId = req.user._id;

        const postIdToDelete = req.params.postId;

        const post = await Post.findById(postIdToDelete);

        if(!post){
            return res.json({ error: "Post not Found"})
        };

        if(post.userId.toString() !== userId.toString()){
            return res.json({ error : "Unauthorized to delete this post"})
        };
        
        await Post.deleteOne({ _id: postIdToDelete})
        return res.json({ message: "Post deleted Successfully"})

    } catch(error) {
        console.error("Error deleting post", error);
        return res.json({ error: "Failed to delete post"})
    }
});

module.exports = router;