import { useEffect, useRef, useState } from 'react';

const useWebSocket = (url) => {
    const [isConnected, setIsConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const socketRef = useRef(null);

    useEffect(() => {
        // Initialize WebSocket connection
        socketRef.current = new WebSocket(url);

        // Handle connection open
        socketRef.current.onopen = () => {
            setIsConnected(true);
            console.log('WebSocket connected');
        };

        // Handle incoming messages
        socketRef.current.onmessage = (event) => {
            setMessages((prevMessages) => [...prevMessages, event.data]);
        };

        // Handle connection close
        socketRef.current.onclose = () => {
            setIsConnected(false);
            console.log('WebSocket disconnected');
        };

        // Handle errors
        socketRef.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        // Cleanup on component unmount
        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, [url]);

    // Function to send a message
    const sendMessage = (message) => {
        if (socketRef.current && isConnected) {
            socketRef.current.send(message);
        } else {
            console.error('WebSocket is not connected');
        }
    };

    return { isConnected, messages, sendMessage };
};

export default useWebSocket;