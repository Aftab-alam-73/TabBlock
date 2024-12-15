import { Server as HTTPServer } from "http";
import { Server, Socket } from "socket.io";

// Define the type for the map key
type ActiveTabKey = string; // Format: `${userId}:${appId}`

// Define the structure of the data received from socket events
interface TabActionPayload {
  userId: string;
  appId: string;
}

// In-memory store for active tabs
const activeTabs: Map<ActiveTabKey, string> = new Map();

/**
 * Initializes the Socket.IO server.
 * @param httpServer - The HTTP server to attach Socket.IO to.
 */
export const initSocket = (httpServer: HTTPServer): void => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*", 
    },
  });

  io.on("connection", (socket: Socket) => {
    console.log("A client connected:", socket.id);

    /**
     * Handle user opening an app in a tab
     */
    socket.on("open-app", ({ userId, appId }: TabActionPayload) => {
        // console.log(`User ${userId} opened app ${appId} in tab ${socket.id}`);
      
        const key: ActiveTabKey = `${userId}:${appId}`;
      
        if (activeTabs.has(key)) {
          const conflictingSocketId = activeTabs.get(key);
      
          // Notify only the conflicting (new) tab
          io.to(socket.id).emit("tab-conflict", { appId });
      
        } else {
          // Register this tab as the active one
          activeTabs.set(key, socket.id);
        }
      });
      
      socket.on("logout-other-tab", ({ userId, appId }: TabActionPayload) => {
        const key: ActiveTabKey = `${userId}:${appId}`;
        const conflictingSocketId = activeTabs.get(key);
      
        if (conflictingSocketId) {
          // Notify the existing tab to log out
          io.to(conflictingSocketId).emit("force-logout", { appId });
          activeTabs.delete(key); // Remove from active tabs
        }
      });
      
      socket.on("close-app", ({ userId, appId }: TabActionPayload) => {
        const key: ActiveTabKey = `${userId}:${appId}`;
        if (activeTabs.get(key) === socket.id) {
          activeTabs.delete(key);
          console.log(`Tab closed for app ${appId} and user ${userId}`);
        }
      });
      
    /**
     * Handle user disconnection
     */
    socket.on("disconnect", () => {
      console.log("A client disconnected:", socket.id);

      // Remove all references to the disconnected socket
      for (const [key, socketId] of activeTabs.entries()) {
        if (socketId === socket.id) {
          activeTabs.delete(key);
        }
      }
    });
  });
};
