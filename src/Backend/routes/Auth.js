const express = require("express");
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const {getToken} = require("../Utils/Helpers");
 


router.post('/register', async (req, res) => {
    try{
        const { userName, email, password } = req.body;

        // Check if user Exist
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.json({ message: "User with this email already exist!"});
        };
        const hashedPassword = await bcrypt.hash(password, 10);

        // save new user details

        const user = new User({
            userName,
            email,
            password: hashedPassword
        });
        await user.save();

        // token to return to the user
        const token = getToken(email, user);
        
        res.json({ message: "User created successfully"})

    } catch(error) {
        console.error(error);
        res.json({message: "Error creating user!"})

    }
});

// Login endpoint
router.post("/login", (req, res) => {
    // check if email exists
    User.findOne({ email: req.body.email })
  
      // if email exists
      .then((user) => {
        // compare the password entered and the hashed password found
        bcrypt
          .compare(req.body.password, user.password)
  
          // if the passwords match
          .then((passwordCheck) => {
  
            // check if password matches
            if(!passwordCheck) {
              return res.status(400).send({
                message: "Passwords does not match",
                error,
              });
            }
  
            
  
            //   return success response
            res.status(200).send({
              message: "Login Successful",
              token,
            });
          })
          // catch error if password does not match
          .catch((error) => {
            res.status(400).send({
              message: "Passwords does not match",
              error,
            });
          });
      })
      // catch error if email does not exist
      .catch((e) => {
        res.status(404).send({
          message: "Email not found",
          e,
        });
      });
  });



module.exports =  router;