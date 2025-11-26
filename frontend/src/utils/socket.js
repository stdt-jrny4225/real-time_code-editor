// frontend/src/utils/socket.js
import { io } from "socket.io-client";

let socket;

export const getSocket = () => {
  if (!socket) {
    socket = io("https://real-time-code-editor-1izy.onrender.com");
  }
  return socket;
};
