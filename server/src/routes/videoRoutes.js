const express = require('express');
const videoController = require('../controllers/videoController');

const router = express.Router();

// Route to get all videos
router.get('/', videoController.getAllVideos);

// Route to get a single video by ID
router.get('/:id', videoController.getVideoById);

// Route to upload a new video
router.post('/', videoController.uploadVideo);

// Route to update video details by ID
router.put('/:id', videoController.updateVideo);

// Route to delete a video by ID
router.delete('/:id', videoController.deleteVideo);

module.exports = router;