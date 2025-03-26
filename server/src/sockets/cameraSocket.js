const { Server } = require("socket.io");

function initializeCameraSocket(server) {
    const io = new Server(server, {
        cors: {
            origin: "*", // Adjust this to your frontend's URL for better security
            methods: ["GET", "POST"],
        },
    });

    const cameraNamespace = io.of("/camera");

    cameraNamespace.on("connection", (socket) => {
        console.log("A camera client connected:", socket.id);

        // Handle camera stream data
        socket.on("stream", (data) => {
            console.log("Received stream data from camera:", data);
            // Broadcast the stream data to other clients
            socket.broadcast.emit("stream", data);
        });

        // Handle camera disconnection
        socket.on("disconnect", () => {
            console.log("A camera client disconnected:", socket.id);
        });
    });

    return io;
}

module.exports = initializeCameraSocket;