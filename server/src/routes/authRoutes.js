const express = require("express");
const {registerUser, loginUser, verifyUser} = require("../controllers/authController");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Signup Route
router.post("/register", registerUser);

// Login Route
router.post("/login", loginUser);

// Verify User Route
router.get("/me", authMiddleware, verifyUser);

module.exports = router;
