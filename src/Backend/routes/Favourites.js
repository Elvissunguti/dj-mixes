const express = require("express");
const router = express.Router();
const Mix = require("../models/Mix");
const Favourite = require("../models/Favourite");
const passport = require("passport");


router.post("/addFavourite",
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const mixId = req.body.mixId;
      const userId = req.user._id;

      if (!mixId) {
        return res.status(400).json({ error: "Missing mixId in request body" });
      }

      const mix = await Mix.findById(mixId);
      if (!mix) {
        return res.status(404).json({ error: "Mix not found" });
      }

      const existingFavorite = await Favourite.findOne({ userId, mixId });

      if (!existingFavorite) {
        await Favourite.create({ userId, mixId });
        mix.favouriteCount += 1;
        await mix.save();
      }

      res.json({ message: "Mix added to favorites successfully", mix });
    } catch (error) {
      console.error(error);
      return res.json({ error: "Failed to add mix to favorites" });
    }
  }
);


router.delete("/deleteFavourite",
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const mixId = req.body.mixId;
      const userId = req.user._id;

      if (!mixId) {
        return res.status(400).json({ error: "Missing mixId in request params" });
      }

      const mix = await Mix.findById(mixId);
      if (!mix) {
        return res.status(404).json({ error: "Mix not found" });
      }

      const existingFavorite = await Favourite.findOne({ userId, mixId });

      if (existingFavorite) {
        await Favourite.findOneAndDelete({ userId, mixId });
        mix.favouriteCount -= 1;
        await mix.save();
      }

      res.json({ message: "Mix removed from favorites successfully" });
    } catch (error) {
      console.error(error);
      return res.json({ error: "Failed to remove mix from favorites" });
    }
  }
);

router.get("/favouriteCount",
passport.authenticate("jwt", { session: false}),
async (req, res) => {
  try{
    const currentUser = req.user._id;
    const mixId = req.body.mixId;



  } catch (error){
  console.error(error);
  res.json({ error: "Failed to get the number of counts"})
  }    n
})




module.exports = router;