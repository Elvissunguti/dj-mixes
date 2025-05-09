/* eslint-disable */
const express = require("express");
const router = express.Router()
const passport = require("passport");
const Post = require("../models/Posts");
const moment = require("moment");
const Profile = require("../models/Profile");


router.post("/create",
    passport.authenticate("jwt", {session: false}),
   async (req, res) => {

        const { imageUrl, description } = req.body;

        if (!imageUrl || !description){
            res.json({ error: "unable to create post"})
       }

       const user = req.user.userName;
        const userId = req.user._id;
        const createdAt = new Date(); 
        const postDate = moment(createdAt).format("YYYY-MM-DD");
        const postTime = moment(createdAt).format("HH:mm");
        const PostDetails = { user, image: imageUrl, description, userId, postDate, postTime };
        try{
        
        const createdPost = await Post.create(PostDetails);
        return res.json({ message:"Post Created Successfully", createdPost});

    } catch(error){
        console.error("Error saving post:", error);
        res.status(500).json({ error: "Failed to save post" });
    }
    }
 );


 // get all the posts of the current user
 router.get("/get/myposts",
 passport.authenticate("jwt", {session: false}),
 async (req, res) => {
    try{

        const userId = req.user._id;

        const posts = await Post.find({userId});

        const postData = [];

        // Iterate through posts and retrieve profilePics
        for (const post of posts) {
            // Find the profile for the user who made the post
            const userProfile = await Profile.findOne({ userId: post.userId });
            
            const profilePic = userProfile ? userProfile.profilePic : null;

            postData.push({
                user: post.user,
                _id: post._id,
                image: post.image,
                description: post.description,
                postDate: post.postDate,
                postTime: post.postTime,
                profilePic: profilePic ? profilePic : null,
            });
        }
          res.json({ data: postData})

    } catch (error) {
        console.error("Error fetching my posts:", error);
        res.json({ error: "Failed to fetch posts"})
    }
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
                image: post.image,
                description: post.description,
                postDate: post.postDate,
                postTime: post.postTime,
                profilePic: profilePic ? profilePic : null,
            });
        }
        
        return res.json({ data: postData });
        
    } catch(error) {
        console.log(error);
        res.json({ error: "Could not fetch the posts"})
    }
});

router.get("/get/posts/:userId",
passport.authenticate("jwt", { session: false}),
async (req, res) => {

    try{

        const userId = req.params.userId;

        const posts = await Post.find({ userId })

        const postData = [];

        for (const post of posts) {
            
            const userProfile = await Profile.findOne({ userId: post.userId });

            const profilePic = userProfile ? userProfile.profilePic : null;

            postData.push({
                user: post.user,
                image: post.image,
                description: post.description,
                postDate: post.postDate,
                postTime: post.postTime,
                profilePic: profilePic ? profilePic : null,
            });
        }
        
        return res.json({ data: postData });
        
    } catch(error) {
        console.log(error);
        res.json({ error: "Could not fetch the posts"})
    }
});

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