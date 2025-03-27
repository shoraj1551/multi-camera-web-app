// server/src/sockets/webrtcSocket.js
const { Server } = require("socket.io");

function initializeWebRTC(server) {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        },
    });

    io.on("connection", (socket) => {
        console.log(`WebRTC client connected: ${socket.id}`);

        socket.on("offer", (data) => {
            socket.to(data.target).emit("offer", data);
        });

        socket.on("answer", (data) => {
            socket.to(data.target).emit("answer", data);
        });

        socket.on("ice-candidate", (data) => {
            socket.to(data.target).emit("ice-candidate", data);
        });

        socket.on("disconnect", () => {
            console.log(`WebRTC client disconnected: ${socket.id}`);
        });
    });
    return io;
}

module.exports = initializeWebRTC;
