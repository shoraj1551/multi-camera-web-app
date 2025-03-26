const Camera = require('../models/Camera');

// Controller to get all cameras
const getAllCameras = async (req, res) => {
    try {
        const cameras = await Camera.find();
        res.status(200).json(cameras);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cameras', error });
    }
};

// Controller to get a single camera by ID
const getCameraById = async (req, res) => {
    try {
        const { id } = req.params;
        const camera = await Camera.findById(id);
        if (!camera) {
            return res.status(404).json({ message: 'Camera not found' });
        }
        res.status(200).json(camera);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching camera', error });
    }
};

// Controller to create a new camera
const createCamera = async (req, res) => {
    try {
        const { name, location, status } = req.body;
        const newCamera = new Camera({ name, location, status });
        await newCamera.save();
        res.status(201).json(newCamera);
    } catch (error) {
        res.status(500).json({ message: 'Error creating camera', error });
    }
};

// Controller to update a camera by ID
const updateCamera = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCamera = await Camera.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedCamera) {
            return res.status(404).json({ message: 'Camera not found' });
        }
        res.status(200).json(updatedCamera);
    } catch (error) {
        res.status(500).json({ message: 'Error updating camera', error });
    }
};

// Controller to delete a camera by ID
const deleteCamera = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCamera = await Camera.findByIdAndDelete(id);
        if (!deletedCamera) {
            return res.status(404).json({ message: 'Camera not found' });
        }
        res.status(200).json({ message: 'Camera deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting camera', error });
    }
};

module.exports = {
    getAllCameras,
    getCameraById,
    createCamera,
    updateCamera,
    deleteCamera,
};