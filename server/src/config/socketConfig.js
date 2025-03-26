const socketIO = require('socket.io');

const configureSocket = (server) => {
    const io = socketIO(server, {
        cors: {
            origin: '*', // Update this with your frontend's URL in production
            methods: ['GET', 'POST'],
        },
    });

    io.on('connection', (socket) => {
        console.log(`New client connected: ${socket.id}`);

        // Handle custom events
        socket.on('message', (data) => {
            console.log(`Message received: ${data}`);
            io.emit('message', data); // Broadcast the message to all connected clients
        });

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });

    return io;
};

module.exports = configureSocket;