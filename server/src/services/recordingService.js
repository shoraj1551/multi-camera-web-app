const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

class RecordingService {
    constructor(outputDir) {
        this.outputDir = outputDir || path.join(__dirname, '../../recordings');
        if (!fs.existsSync(this.outputDir)) {
            fs.mkdirSync(this.outputDir, { recursive: true });
        }
        this.activeRecordings = {}; // Track active recordings per camera
    }

    startRecording(cameraId, outputFilename) {
        return new Promise((resolve, reject) => {
            const outputPath = path.join(this.outputDir, outputFilename);

            const ffmpegProcess = spawn('ffmpeg', [
                '-i', `rtsp://camera/${cameraId}`,
                '-c:v', 'copy',
                '-c:a', 'aac',
                outputPath
            ]);

            ffmpegProcess.on('error', (err) => reject(`Recording failed: ${err.message}`));

            ffmpegProcess.on('close', (code) => {
                if (code === 0) {
                    resolve(`Recording saved: ${outputPath}`);
                } else {
                    reject(`FFmpeg exited with code ${code}`);
                }
            });

            this.activeRecordings[cameraId] = ffmpegProcess;
        });
    }

    stopRecording(cameraId) {
        return new Promise((resolve, reject) => {
            if (this.activeRecordings[cameraId]) {
                this.activeRecordings[cameraId].kill('SIGINT');
                delete this.activeRecordings[cameraId];
                resolve(`Recording for Camera ${cameraId} stopped.`);
            } else {
                reject(`No active recording found for Camera ${cameraId}`);
            }
        });
    }

    listRecordings() {
        return new Promise((resolve, reject) => {
            fs.readdir(this.outputDir, (err, files) => {
                if (err) reject(`Failed to list recordings: ${err.message}`);
                else resolve(files.filter(file => file.endsWith('.mp4')));
            });
        });
    }

    deleteRecording(filename) {
        return new Promise((resolve, reject) => {
            const filePath = path.join(this.outputDir, filename);
            fs.unlink(filePath, (err) => {
                if (err) reject(`Failed to delete recording: ${err.message}`);
                else resolve(`${filename} deleted successfully.`);
            });
        });
    }
}

module.exports = RecordingService;