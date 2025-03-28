// server/index.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');

const { testPythonService } = require('./src/services/streamService');
const connectDB = require('./src/config/database');
const cameraRoutes = require("./src/routes/cameraRoutes");

dotenv.config();
// ✅ Connect to MongoDB BEFORE starting the server
connectDB();

console.log("JWT Secret:", process.env.JWT_SECRET);

const app = express();
// ✅ Middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8000;

// ✅ Routes
app.use("/api/auth", require("./src/routes/authRoutes"));// Authentication Routes
app.use("/api/cameras", cameraRoutes); // Camera Routes

// ✅ Health Check Route
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// ✅ Create HTTP Server & WebSocket Setup
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// ✅ WebSocket and camera streaming logic
io.on('connection', (socket) => {
  console.log('New client connected');
  console.log(`Frontend running on: http://localhost:3000`);
  console.log(`Backend running on: http://localhost:${PORT}`);
  console.log(`Current environment: ${process.env.NODE_ENV}`);

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// ✅ Start the Server (Only One Call)
server.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  
  // ✅ Ensure the Python service test runs AFTER the server starts
  try {
    await testPythonService();
  } catch (err) {
    console.error("⚠️ Python service test failed:", err);
  }
});

