const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");



const authenticateUser = async (req, res, next) => {
    try {
      // Get the JWT token from the request headers
      const token = req.headers.authorization.split(' ')[1]; // Assuming the token is sent as a Bearer token
  
      // Verify the token
      const decodedToken = jwt.verify(token, "SECRETKEY");
  
      // Retrieve the user ID from the decoded token
      const userId = decodedToken._id;
  
      // Fetch the user from the database based on the user ID
      const user = await User.findById(userId);
  
      // Attach the user object to the request for further use
      req.user = user;
  
      next();
    } catch (error) {
      console.error('Authentication error:', error);
      res.status(401).json({ error: 'Unauthorized' });
    }
  };


router.get('/initialsImage', authenticateUser, async (req, res) => {
    try {
      // Access the authenticated user from the request object
      const user = req.user;
  
      // Extract the userName from the user object
      const userName = user.userName;
  
      // Generate initials from the userName
      const initials = getInitials(userName);
  
      // Generate the initials image using the Canvas library
      const canvas = createCanvas(100, 100);
      const context = canvas.getContext('2d');
      context.fillStyle = '#f0f0f0';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = '#000000';
      context.font = '48px Arial';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(initials, canvas.width / 2, canvas.height / 2);
  
      // Convert the canvas to a data URL
      const dataUrl = canvas.toDataURL();
  
      // Return the initials, data URL, and userName in the response
      res.json({ initials, dataUrl, userName });
    } catch (error) {
      console.error('Error fetching userName and generating initials image:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Helper function to get initials from a string
  function getInitials(str) {
    const words = str.split(' ');
    return words
      .map(word => word.charAt(0).toUpperCase())
      .join('');
  }

module.exports = router;