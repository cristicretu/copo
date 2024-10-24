const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");

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

// Timer Module
class Timer {
  constructor() {
    this.minutes = WORK_TIME;
    this.seconds = 0;
    this.isBreak = false;
    this.running = false;
    this.timerInterval = null;
  }

  decrement() {
    if (this.seconds === 0) {
      if (this.minutes === 0) {
        this.switchMode();
        this.start();
      } else {
        this.minutes--;
        this.seconds = 59;
      }
    } else {
      this.seconds--;
    }
  }

  start() {
    if (!this.running) {
      this.running = true;
      this.timerInterval = setInterval(() => this.decrement(), 1000);
    }
  }

  stop() {
    clearInterval(this.timerInterval);
    this.running = false;
  }

  switchMode() {
    this.stop();
    this.isBreak = !this.isBreak;
    this.minutes = this.isBreak ? BREAK_TIME : WORK_TIME;
  }

  getState() {
    return {
      minutes: this.minutes,
      seconds: this.seconds,
      isBreak: this.isBreak,
      running: this.running,
    };
  }
  randomizeState() {
    this.isBreak = Math.random() > 0.5;
    this.minutes = this.isBreak
      ? Math.floor(Math.random() * BREAK_TIME)
      : Math.floor(Math.random() * WORK_TIME);
    this.seconds = Math.floor(Math.random() * 60);
    this.running = false;
  }
}

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

  // Instead of emitting every second, emit every 10 seconds
  setInterval(() => {
    io.emit("timer-update", timer.getState());
  }, 30000); // 30 seconds

  // Listen for chat messages
  socket.on("chat-message", (object) => {
    if (timer.isBreak) {
      io.emit("chat-message", object);
    }
  });

  // Handle re-sync request from client after inactivity
  socket.on("request-sync", () => {
    io.emit("timer-update", timer.getState());
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
