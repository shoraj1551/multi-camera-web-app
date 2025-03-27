const handleCameraConnection = (socket, namespace) => {
    console.log(`A camera connected: ${socket.id}`);

    socket.on("joinRoom", (room) => {
        socket.join(room);
        console.log(`${socket.id} joined room: ${room}`);
    });

    socket.on("stream", (data) => {
        console.log(`Streaming from ${socket.id} to room: ${data.room}`);
        socket.to(data.room).emit("stream", data);
    });

    socket.on("leaveRoom", (room) => {
        socket.leave(room);
        console.log(`${socket.id} left room: ${room}`);
    });

    socket.on("disconnect", () => {
        console.log(`Camera ${socket.id} disconnected`);
    });
};

module.exports = { handleCameraConnection };