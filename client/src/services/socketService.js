import { io } from "socket.io-client";

class SocketService {
    constructor() {
        this.socket = null;
    }

    connect(url) {
        return new Promise((resolve, reject) => {
            this.socket = io(url);

            this.socket.on("connect", () => {
                console.log("Connected to socket server");
                resolve(this.socket);
            });

            this.socket.on("connect_error", (err) => {
                console.error("Socket connection error:", err);
                reject(err);
            });
        });
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            console.log("Disconnected from socket server");
        }
    }

    on(event, callback) {
        if (this.socket) {
            this.socket.on(event, callback);
        }
    }

    emit(event, data) {
        if (this.socket) {
            this.socket.emit(event, data);
        }
    }

    off(event) {
        if (this.socket) {
            this.socket.off(event);
        }
    }
}

const socketService = new SocketService();
export default socketService;