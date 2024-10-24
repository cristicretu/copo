const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");
import { Timer } from "./Timer";

const router = require("./router");

const WORK_TIME = process.env.WORK_TIME || 25; // Use environment variables
const BREAK_TIME = process.env.BREAK_TIME || 5;

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: process.env.CLIENT_URL || "https://copo-skyash.vercel.app", // Client origin as env var
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(cors());
app.use(router);

// Significant event emissions
const emitSignificantUpdate = () => {
  io.emit("timer-update", timer.getState());
};

const timer = new Timer();
let connectionCount = 0;

io.on("connect", (socket) => {
  connectionCount++;

  // Check if server just started (first connection)
  if (process.uptime() < 60 && connectionCount === 1) {
    // Handle server restart logic or randomize the timer state here if needed
    console.log("Server just started. Resetting timer state...");
    timer.randomizeState(); // Optional: randomize the timer state
  }

  // Send the current timer state to the new client
  socket.emit("timer-update", timer.getState());

  // Listen for chat messages
  socket.on("chat-message", (object) => {
    if (timer.isBreak) {
      io.emit("chat-message", object);
    }
  });

  // Handle re-sync request from client after inactivity
  socket.on("request-sync", () => {
    socket.emit("timer-update", timer.getState());
  });

  // Start the timer if it's not already running
  if (!timer.running) {
    timer.start();
    if (timer.minutes === 0 && timer.seconds === 0) {
      emitSignificantUpdate(); // Emit significant change
    }
  }

  // Proper cleanup when the client disconnects
  socket.on("disconnect", () => {
    connectionCount--;
    console.log(`Client disconnected: ${socket.id}`);
  });

  // Error handling for socket events
  socket.on("error", (err) => {
    console.error(`Socket error from ${socket.id}: ${err}`);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server has started on port ${PORT}.`));
