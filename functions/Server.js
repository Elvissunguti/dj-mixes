/* eslint-disable */
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const functions = require("firebase-functions");
const JwtStrategy = require("passport-jwt").Strategy;
const {ExtractJwt} = require("passport-jwt");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const session = require("express-session");
const User = require("./models/User");
const authRoutes = require("./routes/Auth");
const mixRoutes = require("./routes/Mix");
const path = require("path");
const postRoutes = require("./routes/Posts");
const profileRoutes = require("./routes/Profile");
const userRoutes = require("./routes/User");
const searchRoutes = require("./routes/Search");
const playlistRoutes = require("./routes/Playlist");



const app = express();
// const PORT = process.env.PORT || 3000;


mongoose.connect(
    'mongodb://dj-mixes:dj-mixes@ac-xhkvbmr-shard-00-00.e4ffdhs.mongodb.net:27017,ac-xhkvbmr-shard-00-01.e4ffdhs.mongodb.net:27017,ac-xhkvbmr-shard-00-02.e4ffdhs.mongodb.net:27017/dj-mixes?ssl=true&replicaSet=atlas-7xjnul-shard-0&authSource=admin&retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true}
    ).then(() => {
        console.log("Connected to mongodb atlas!");
    }).catch((err) => {
        console.log("Error connecting to MongoDb atlas!", err)
    });

    app.use(session({
      secret: "SECRETKEY",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        sameSite: "None",
    
        // Add other cookie options as needed
      },
    }));

    app.use(cors({
      origin: [
        "https://mixjam-30173.web.app",
        "https://mixjam-30173.firebaseapp.com",
      ],
      credentials: true,
    }));


    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    app.use(passport.initialize());
    app.use(passport.session());

      // setup passport-jwt
      const opts = {};
      opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
      opts.secretOrKey = "SECRETKEY"; // Use environment variable for the secret key
      
      passport.use(
        new JwtStrategy(opts, async function (jwt_payload, done) {
          try {
            const user = await User.findOne({ _id: jwt_payload.identifier });
            if (user) {
              return done(null, user); // Authentication successful
            } else {
              return done(null, false); // User not found
              // Alternatively, you could create a new account here
            }
          } catch (err) {
            return done(err, false); // Error during user lookup
          }
        })
      );



      // Google OAuth strategy
passport.use(new GoogleStrategy({
  clientID: "203554355529-tkuaar1lfqv1tbl64q1rsjjh1qit09lh.apps.googleusercontent.com",
  clientSecret: "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",
  callbackURL: "https://us-central1-mixjam-30173.cloudfunctions.net/api/auth/google/callback",
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({googleId: profile.id});

    if (!user) {
      // If user doesn't exist, create a new user based on the Google profile
      user = new User({
        userName: profile.displayName,
        email: profile.emails[0].value,
        googleId: profile.id,
        // Add additional fields as needed
      });
      await user.save();
    } else {
      // Update user information if necessary
      user.email = profile.emails[0].value;
      // Update additional fields if needed
      await user.save();
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

// Serialize and deserialize user for sessions
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});


      

 app.use("/auth", authRoutes);
 app.use("/user", userRoutes)
 app.use("/mix", mixRoutes);
 app.use("/post", postRoutes);
 app.use("/profile", profileRoutes);
 app.use("/search", searchRoutes);
 app.use("/playlist", playlistRoutes);

      

 exports.api = functions.https.onRequest(app);
    
