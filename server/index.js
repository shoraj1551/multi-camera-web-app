// server/index.js
const express = require('express');
const { testPythonService } = require('./services/streamService');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await testPythonService();
});

// WebSocket and camera streaming logic will be implemented here
io.on('connection', (socket) => {
  console.log('New client connected');
  console.log(`Frontend running on: http://localhost:5173`);
  console.log(`Backend running on: http://localhost:5000`);
  console.log(`Current environment: ${process.env.NODE_ENV}`);
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});


server.listen(PORT, () => console.log(`Server running on port ${PORT}`));