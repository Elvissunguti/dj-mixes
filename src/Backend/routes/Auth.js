const express = require("express");
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const {getToken} = require("../Utils/Helpers");
const jwtUtils = require('../Utils/Helpers');
 


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
        
        
        

        const token = await getToken(email, user);

        return res.json({ message: "User created successfully", token})

    } catch(error) {
        console.error(error);
        res.json({message: "Error creating user!"})

    }
});

// Login endpoint
router.post("/login", async (request, response) => {
  try {
    // Check if email exists
    const user = await User.findOne({ email: request.body.email });

    // If email exists
    if (user) {
      // Compare the password entered and the hashed password found
      const passwordCheck = await bcrypt.compare(
        request.body.password,
        user.password
      );

      // If the passwords match
      if (passwordCheck) {
        // Generate a JWT token for authentication
        const token = await getToken(user.email, user);
        return response.status(200).json({ message: "Login Successfull", token});
      } else {
        
        // Password does not match
        return response.status(400).send({
          message: "Password does not match",
        });
      }
    } else {
      // Email not found
      return response.status(404).send({
        message: "Email not found",
      });
    }
  } catch (error) {
    // Error occurred during login
    return response.status(500).send({
      message: "Internal Server Error",
      error,
    });
  }
});

router.post("/logout", async (request, response) => {
  try {
    // Verify the token
    const token = request.headers.authorization;

    // Check if the token is invalid
    if (jwtUtils.isTokenInvalid(token)) {
      console.error("Invalid token:", token);
      return response.status(401).send({
        message: "Invalid token",
      });
    }

    // Verify the token
    const decodedToken = jwtUtils.verifyToken(token);

    if (!decodedToken) {
      console.error("Invalid token:", token);
      return response.status(401).send({
        message: "Invalid token",
      });
    }

    // Invalidate the token
    jwtUtils.invalidateToken(token);

    return response.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    return response.status(500).send({
      message: "Internal Server Error",
      error,
    });
  }
});


module.exports =  router;