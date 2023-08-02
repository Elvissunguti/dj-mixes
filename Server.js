
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./src/Backend/models/User");
const authRoutes = require("./src/Backend/routes/Auth");
const mixRoutes = require("./src/Backend/routes/Mix");


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
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
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "thisKeyIsSupposedToBeSecret";
passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
        User.findOne({_id: jwt_payload.identifier}, function (err, user) {
            // done(error, doesTheUserExist)
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
    })
);

 app.use("/auth", authRoutes);
 app.use("/mix", mixRoutes)

      

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT} `)
});
    
