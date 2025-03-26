const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

class RecordingService {
    constructor(outputDir) {
        this.outputDir = outputDir || path.join(__dirname, '../../recordings');
        if (!fs.existsSync(this.outputDir)) {
            fs.mkdirSync(this.outputDir, { recursive: true });
        }
    }

    startRecording(cameraId, outputFilename) {
        return new Promise((resolve, reject) => {
            const outputPath = path.join(this.outputDir, outputFilename);

            // Simulate starting a recording process (e.g., using FFmpeg)
            const ffmpegProcess = spawn('ffmpeg', [
                '-i', `rtsp://camera/${cameraId}`,
                '-c:v', 'copy',
                '-c:a', 'aac',
                outputPath
            ]);

            ffmpegProcess.on('error', (err) => {
                reject(`Failed to start recording: ${err.message}`);
            });

            ffmpegProcess.on('close', (code) => {
                if (code === 0) {
                    resolve(`Recording saved to ${outputPath}`);
                } else {
                    reject(`Recording process exited with code ${code}`);
                }
            });

            this.currentProcess = ffmpegProcess;
        });
    }

    stopRecording() {
        return new Promise((resolve, reject) => {
            if (this.currentProcess) {
                this.currentProcess.kill('SIGINT');
                this.currentProcess.on('close', () => {
                    resolve('Recording stopped successfully.');
                });
            } else {
                reject('No recording process is currently running.');
            }
        });
    }

    listRecordings() {
        return new Promise((resolve, reject) => {
            fs.readdir(this.outputDir, (err, files) => {
                if (err) {
                    reject(`Failed to list recordings: ${err.message}`);
                } else {
                    resolve(files.filter(file => file.endsWith('.mp4')));
                }
            });
        });
    }

    deleteRecording(filename) {
        return new Promise((resolve, reject) => {
            const filePath = path.join(this.outputDir, filename);
            fs.unlink(filePath, (err) => {
                if (err) {
                    reject(`Failed to delete recording: ${err.message}`);
                } else {
                    resolve(`${filename} deleted successfully.`);
                }
            });
        });
    }
}

module.exports = RecordingService;