const { Server } = require("socket.io");
const socketEvents = require("./socketEvents");

function initializeCameraSocket(server) {
    const io = new Server(server, {
        cors: {
            origin: "*", // Adjust for production security
            methods: ["GET", "POST"],
        },
    });

    const cameraNamespace = io.of("/camera");

    cameraNamespace.on("connection", (socket) => {
        console.log(`Camera Client Connected: ${socket.id}`);
        socketEvents.handleCameraConnection(socket, cameraNamespace);
    });

    return io;
}

module.exports = initializeCameraSocket;