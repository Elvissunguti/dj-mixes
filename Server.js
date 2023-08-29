
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const JwtStrategy = require("passport-jwt").Strategy,
    ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const User = require("./src/Backend/models/User");
const authRoutes = require("./src/Backend/routes/Auth");
const mixRoutes = require("./src/Backend/routes/Mix");
const path = require("path");
const postRoutes = require("./src/Backend/routes/Posts");
const profileRoutes = require("./src/Backend/routes/Profile");
const userRoutes = require("./src/Backend/routes/User");



const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, "public"))); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



mongoose.connect(
    'mongodb://dj-mixes:dj-mixes@ac-xhkvbmr-shard-00-00.e4ffdhs.mongodb.net:27017,ac-xhkvbmr-shard-00-01.e4ffdhs.mongodb.net:27017,ac-xhkvbmr-shard-00-02.e4ffdhs.mongodb.net:27017/dj-mixes?ssl=true&replicaSet=atlas-7xjnul-shard-0&authSource=admin&retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true}
    ).then(() => {
        console.log("Connected to mongodb atlas!");
    }).catch((err) => {
        console.log("Error connecting to MongoDb atlas!", err)
    });


    app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
        );
        res.setHeader(
          "Access-Control-Allow-Methods",
          "GET, POST, PUT, DELETE, PATCH, OPTIONS"
        );
        next();
      });



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


      

 app.use("/auth", authRoutes);
 app.use("/user", userRoutes)
 app.use("/mix", mixRoutes);
 app.use("/post", postRoutes);
 app.use("/profile", profileRoutes);

      

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT} `)
});
    
