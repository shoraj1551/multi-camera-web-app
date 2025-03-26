const { Server } = require('ws');
const { spawn } = require('child_process');
const path = require('path');

// File: /c:/Users/SHORAJ TOMER/multi-camera-web-app/server/src/services/streamService.js


class StreamService {
    constructor(server) {
        this.wss = new Server({ server });
        this.clients = new Map();

        this.wss.on('connection', (ws, req) => {
            const clientId = req.headers['sec-websocket-key'];
            console.log(`Client connected: ${clientId}`);
            this.clients.set(clientId, ws);

            ws.on('message', (message) => {
                console.log(`Message from client ${clientId}: ${message}`);
                this.handleClientMessage(clientId, message);
            });

            ws.on('close', () => {
                console.log(`Client disconnected: ${clientId}`);
                this.clients.delete(clientId);
            });

            ws.on('error', (error) => {
                console.error(`Error from client ${clientId}:`, error);
            });
        });
    }

    handleClientMessage(clientId, message) {
        try {
            const parsedMessage = JSON.parse(message);
            if (parsedMessage.action === 'startStream') {
                this.startStream(clientId, parsedMessage.cameraId);
            } else if (parsedMessage.action === 'stopStream') {
                this.stopStream(clientId);
            } else {
                console.warn(`Unknown action from client ${clientId}: ${parsedMessage.action}`);
            }
        } catch (error) {
            console.error(`Failed to handle message from client ${clientId}:`, error);
        }
    }

    startStream(clientId, cameraId) {
        const ws = this.clients.get(clientId);
        if (!ws) {
            console.error(`Client ${clientId} not found`);
            return;
        }

        const ffmpegPath = 'ffmpeg'; // Ensure ffmpeg is installed and available in PATH
        const streamUrl = `rtsp://camera-${cameraId}/stream`; // Replace with actual camera stream URL

        const ffmpegProcess = spawn(ffmpegPath, [
            '-i', streamUrl,
            '-f', 'mpegts',
            '-codec:v', 'mpeg1video',
            '-s', '640x480',
            '-b:v', '800k',
            '-r', '30',
            '-',
        ]);

        ffmpegProcess.stdout.on('data', (data) => {
            if (ws.readyState === ws.OPEN) {
                ws.send(data);
            }
        });

        ffmpegProcess.stderr.on('data', (data) => {
            console.error(`FFmpeg error for client ${clientId}:`, data.toString());
        });

        ffmpegProcess.on('close', (code) => {
            console.log(`FFmpeg process for client ${clientId} exited with code ${code}`);
        });

        ws.on('close', () => {
            ffmpegProcess.kill('SIGINT');
        });

        this.clients.set(clientId, { ws, ffmpegProcess });
    }

    stopStream(clientId) {
        const clientData = this.clients.get(clientId);
        if (clientData && clientData.ffmpegProcess) {
            clientData.ffmpegProcess.kill('SIGINT');
            console.log(`Stopped stream for client ${clientId}`);
        }
    }
}

module.exports = StreamService;