const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware"); // Ensure middleware is used

const router = express.Router();
let cameras = require("../data/cameraData"); // Corrected the path

// Get all cameras (Protected Route)
router.get("/", authMiddleware, (req, res) => {
    res.json(cameras);
});

// Get a specific camera by ID (Protected Route)
router.get("/:id", authMiddleware, (req, res) => {
    const camera = cameras.find((cam) => cam.id === parseInt(req.params.id));
    if (!camera) {
        return res.status(404).json({ message: "Camera not found" });
    }
    res.json(camera);
});

// Add a new camera (Protected Route, Limit: 50 Cameras)
router.post("/", authMiddleware, (req, res) => {
    if (cameras.length >= 50) {
        return res.status(400).json({ message: "Camera limit reached (50 max)" });
    }

    const { name, location, status } = req.body;
    if (!name || !location || !status) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const newCamera = {
        id: cameras.length + 1,
        name,
        location,
        status,
    };
    cameras.push(newCamera);
    res.status(201).json(newCamera);
});

// Update an existing camera (Protected Route)
router.put("/:id", authMiddleware, (req, res) => {
    const camera = cameras.find((cam) => cam.id === parseInt(req.params.id));
    if (!camera) {
        return res.status(404).json({ message: "Camera not found" });
    }

    const { name, location, status } = req.body;
    if (name) camera.name = name;
    if (location) camera.location = location;
    if (status) camera.status = status;

    res.json(camera);
});

// Delete a camera (Protected Route)
router.delete("/:id", authMiddleware, (req, res) => {
    const cameraIndex = cameras.findIndex((cam) => cam.id === parseInt(req.params.id));
    if (cameraIndex === -1) {
        return res.status(404).json({ message: "Camera not found" });
    }

    cameras.splice(cameraIndex, 1);
    res.status(204).send();
});

module.exports = router;
