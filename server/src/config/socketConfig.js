//This imports Socket.IO, a library 
// that enables real-time communication.
const socketIO = require('socket.io');
const socketEvents = require('../sockets/socketEvents');

//This function takes an HTTP server 
// instance as an argument.
const configureSocket = (server) => {
    const io = socketIO(server, {
        cors: {
            origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Restrict in production
            methods: ['GET', 'POST'],
        },
    });
    
    //When a client connects, the server logs its unique socket.id.
    io.on('connection', (socket) => socketEvents(io, socket));
    //The function returns the WebSocket server instance 
    // for use in other parts of the app.
    return io;
};

module.exports = configureSocket;