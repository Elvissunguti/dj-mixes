const jwt = require("jsonwebtoken");

// Store invalidated tokens
const invalidTokens = new Set();

// Generate a JWT token
exports.getToken = async (email, user) => {
    const token = jwt.sign(
        { identifier: user._id },
        "SECRETKEY", // Replace with your actual secret key
        { expiresIn: "7d" }

    );
    return token;
}

// Verify a JWT token
exports.verifyToken = (token) => {
    try {
        const decodedToken = jwt.verify(token, "SECRETKEY"); // Replace with your actual secret key
        return decodedToken;
    } catch (error) {
        return null; // Invalid token
    }
}

// Invalidate a JWT token
exports.invalidateToken = (token) => {
    invalidTokens.add(token);
}

// Check if a token is invalid
exports.isTokenInvalid = (token) => {
    return invalidTokens.has(token);
}

