import { io } from "socket.io-client";

const URL = "http://localhost:5000"; // backend server

// Create only ONE socket connection globally
export const socket = io(URL, {
  withCredentials: true,
  autoConnect: false, // important: prevents auto reconnection loop
});
