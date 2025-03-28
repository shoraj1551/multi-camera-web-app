const User = require("../models/User"); // <-- Keep only one import
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register User
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate request body
        if (!username || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if the user already exists
        let user = await User.findOne({ $or: [{ email }, { username }] });
        if (user) {
            return res.status(400).json({ error: "Username or email already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        user = new User({ username, email, password: hashedPassword });
        await user.save();

        // Ensure JWT secret exists
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ error: "JWT Secret is missing" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(201).json({ msg: "User registered successfully", token });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
};

// Login User
const loginUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        // Validate request body
        if ((!email && !username) || !password) {
            return res.status(400).json({ error: "Email or Username and Password are required" });
        }

        // Find user by email OR username
        const user = await User.findOne({ $or: [{ email }, { username }] });
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Ensure JWT secret exists
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ error: "JWT Secret is missing" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ msg: "Login successful", token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
};

// Verify User
const verifyUser = async (req, res) => {
    try {
        // Extract user ID from the token (set by authMiddleware)
        const userId = req.user.id;
    
        // Fetch user from database
        const user = await User.findById(userId).select("-password"); // Exclude password
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
    
        res.status(200).json(user);
    } catch (error) {
        console.error("Verify user error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { registerUser, loginUser, verifyUser };