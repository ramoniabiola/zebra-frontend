import { io } from "socket.io-client";

const URL = import.meta.env.BACKEND_URL;

// Create only ONE socket connection globally
export const socket = io(URL, {
  withCredentials: true,
  autoConnect: false, // important: prevents auto reconnection loop
});
