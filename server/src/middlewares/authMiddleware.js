// server/src/middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(401).json({ error: "Access denied" });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ error: "Invalid token" });
    }
};