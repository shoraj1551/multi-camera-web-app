const express = require('express');

const router = express.Router();

// Mock database for cameras
let cameras = [
    { id: 1, name: 'Camera 1', location: 'Entrance', status: 'active' },
    { id: 2, name: 'Camera 2', location: 'Lobby', status: 'inactive' },
    { id: 3, name: 'Camera 3', location: 'Parking', status: 'active' },
];

// Get all cameras
router.get('/', (req, res) => {
    res.json(cameras);
});

// Get a specific camera by ID
router.get('/:id', (req, res) => {
    const camera = cameras.find(cam => cam.id === parseInt(req.params.id));
    if (!camera) {
        return res.status(404).json({ message: 'Camera not found' });
    }
    res.json(camera);
});

// Add a new camera
router.post('/', (req, res) => {
    const { name, location, status } = req.body;
    if (!name || !location || !status) {
        return res.status(400).json({ message: 'All fields are required' });
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

// Update an existing camera
router.put('/:id', (req, res) => {
    const camera = cameras.find(cam => cam.id === parseInt(req.params.id));
    if (!camera) {
        return res.status(404).json({ message: 'Camera not found' });
    }
    const { name, location, status } = req.body;
    if (name) camera.name = name;
    if (location) camera.location = location;
    if (status) camera.status = status;
    res.json(camera);
});

// Delete a camera
router.delete('/:id', (req, res) => {
    const cameraIndex = cameras.findIndex(cam => cam.id === parseInt(req.params.id));
    if (cameraIndex === -1) {
        return res.status(404).json({ message: 'Camera not found' });
    }
    cameras.splice(cameraIndex, 1);
    res.status(204).send();
});

module.exports = router;