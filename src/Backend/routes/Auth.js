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

module.exports =  router;