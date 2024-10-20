const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "https://copo-skyash.vercel.app", // Allow your client origin
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(cors());
app.use(router);

// Timer state
let timer = {
  minutes: 25,
  seconds: 0,
  running: false,
  isBreak: false, // Add a flag to track whether it's break time
};
let timerInterval = null;

// Function to decrement the timer
const decrementTimer = () => {
  if (timer.seconds === 0) {
    if (timer.minutes === 0) {
      // Switch modes when timer reaches zero
      clearInterval(timerInterval);
      timer.running = false;

      // Switch to break or work mode
      if (timer.isBreak) {
        timer.minutes = 25; // Reset to work time
        timer.isBreak = false; // Switch to work mode
      } else {
        timer.minutes = 5; // Set break time
        timer.isBreak = true; // Switch to break mode
      }

      // Start the timer again
      startTimer();
    } else {
      timer.minutes--;
      timer.seconds = 59;
    }
  } else {
    timer.seconds--;
  }

  // Emit the updated timer state to clients
  io.emit("timer-update", timer);
};

// Start the timer
const startTimer = () => {
  if (!timer.running) {
    timer.running = true;
    timerInterval = setInterval(decrementTimer, 1000);
  }
};

io.on("connect", (socket) => {
  socket.on("chat-message", (object) => {
    io.emit("chat-message", object);
  });

  // Send the current timer state to the new client
  socket.emit("timer-update", timer);

  // Start the timer if it's not already running
  if (!timer.running) {
    startTimer();
  }
});

server.listen(process.env.PORT, () => console.log(`Server has started.`));
