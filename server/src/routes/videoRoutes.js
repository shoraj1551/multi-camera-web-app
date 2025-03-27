const express = require('express');
const videoController = require('../controllers/videoController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Route to get all videos (Public)
router.get('/', videoController.getAllVideos);

// Route to get a single video by ID (Public)
router.get('/:id', videoController.getVideoById);

// Route to upload a new video (Protected)
router.post('/', authMiddleware, videoController.uploadVideo);

// Route to update video details by ID (Protected)
router.put('/:id', authMiddleware, videoController.updateVideo);

// Route to delete a video by ID (Protected)
router.delete('/:id', authMiddleware, videoController.deleteVideo);

module.exports = router;
