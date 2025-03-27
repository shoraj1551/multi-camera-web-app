const express = require("express");
const {registerUser, loginUser} = require("../controllers/authController");

const router = express.Router();

// Signup Route
router.post("/registerUser", registerUser);

// Login Route
router.post("/loginUser", loginUser);

module.exports = router;
