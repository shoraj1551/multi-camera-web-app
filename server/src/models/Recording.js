const mongoose = require('mongoose');

const recordingSchema = new mongoose.Schema({
    cameraId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Camera',
        required: true,
    },
    fileName: {
        type: String,
        required: true,
    },
    filePath: {
        type: String,
        required: true,
    },
    duration: {
        type: Number, // Duration in seconds
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Recording = mongoose.model('Recording', recordingSchema);

module.exports = Recording;