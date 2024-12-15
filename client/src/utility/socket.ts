import { io } from "socket.io-client";

// Ensure this matches the backend's URL and port
const socket = io(import.meta.env.VITE_BASE_URL, {
  transports: ["websocket"], // Force WebSocket transport for compatibility
  reconnectionAttempts: 5,   // Retry connections
  timeout: 20000,            // Set timeout for connection
});

export default socket;
