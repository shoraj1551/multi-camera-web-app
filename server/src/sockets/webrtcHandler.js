const { Server } = require("socket.io");

module.exports = (io, socket) => {
    console.log(`📡 WebRTC Socket Connected: ${socket.id}`);

    // Handle joining a WebRTC room
    socket.on("joinWebRTCStream", ({ cameraId, roomId }) => {
        socket.join(roomId);
        console.log(`🎥 Camera ${cameraId} joined WebRTC room: ${roomId}`);
    });

    // Handle offering WebRTC connection
    socket.on("offer", (data) => {
        console.log(`📶 Offer from camera ${data.cameraId} to room ${data.roomId}`);
        socket.to(data.roomId).emit("offer", data);
    });

    // Handle answer to WebRTC connection
    socket.on("answer", (data) => {
        console.log(`✅ Answer received for room ${data.roomId}`);
        socket.to(data.roomId).emit("answer", data);
    });

    // Handle ICE candidate exchange
    socket.on("iceCandidate", (data) => {
        console.log(`📡 ICE Candidate from ${data.cameraId} to room ${data.roomId}`);
        socket.to(data.roomId).emit("iceCandidate", data);
    });

    socket.on("disconnect", () => {
        console.log(`❌ WebRTC socket disconnected: ${socket.id}`);
    });
};
