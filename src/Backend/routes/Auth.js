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

router.post("/login", async (req, res) => {
    const { email, password} = req.body;
    
    // check if the user with the given email exist
    const user = await User.findOne({ email: email});
    if(!user){
        return res.json({ err: "user with the given email does not exist"})
    }
    console.log(user);

    // if user exists check if the password is correct
     const validPassword = await bcrypt.compare(password, user.password);
     
     if(!validPassword){
        return res.json({ err: "password does not match"})
     }

         // Step 4: If the credentials are correct, return a token to the user.
    const token = await getToken(user.email, user);
    const userToReturn = {...user.toJSON(), token};
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
});

module.exports =  router;