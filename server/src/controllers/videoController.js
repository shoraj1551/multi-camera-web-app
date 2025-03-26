const fs = require('fs');
const path = require('path');

// Controller for handling video-related operations
const videoController = {
    // Fetch a list of available videos
    getVideos: (req, res) => {
        const videosDir = path.join(__dirname, '../../videos');
        fs.readdir(videosDir, (err, files) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to retrieve videos' });
            }
            const videoFiles = files.filter(file => file.endsWith('.mp4'));
            res.json({ videos: videoFiles });
        });
    },

    // Stream a specific video
    streamVideo: (req, res) => {
        const videoName = req.params.videoName;
        const videoPath = path.join(__dirname, '../../videos', videoName);

        fs.stat(videoPath, (err, stats) => {
            if (err || !stats.isFile()) {
                return res.status(404).json({ error: 'Video not found' });
            }

            const range = req.headers.range;
            if (!range) {
                return res.status(416).send('Requires Range header');
            }

            const videoSize = stats.size;
            const CHUNK_SIZE = 10 ** 6; // 1MB
            const start = Number(range.replace(/\D/g, ''));
            const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

            const contentLength = end - start + 1;
            const headers = {
                'Content-Range': `bytes ${start}-${end}/${videoSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': contentLength,
                'Content-Type': 'video/mp4',
            };

            res.writeHead(206, headers);

            const videoStream = fs.createReadStream(videoPath, { start, end });
            videoStream.pipe(res);
        });
    },
};

module.exports = videoController;