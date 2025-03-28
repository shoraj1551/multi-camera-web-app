const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
    try {
        // Extract Authorization header
        const authHeader = req.headers["authorization"];
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Access denied. No token provided." });
        }

        const token = authHeader.split(" ")[1]; // Extract the token

        // Ensure JWT secret is set
        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is missing from environment variables.");
            return res.status(500).json({ error: "Server configuration error: JWT secret missing" });
        }

        // Verify token
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            console.error("JWT Verification Error:", err.message);
            return res.status(401).json({
                error: err.name === "TokenExpiredError" ? "Token expired. Please login again." : "Invalid token",
            });
        }

        // Validate decoded payload
        if (!decoded || !decoded.id) {
            return res.status(401).json({ error: "Invalid token payload" });
        }

        // Fetch user from DB (optional but recommended for security)
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Attach user info to request object
        req.user = user;
        next();
    } catch (err) {
        console.error("Authentication Error:", err);
        res.status(401).json({ error: "Invalid or expired token" });
    }
};