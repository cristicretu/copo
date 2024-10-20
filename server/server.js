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
    credentials: true, // Include if you are using cookies or authentication
  },
});

app.use(cors());
app.use(router);

let timer = {
  minutes: 25,
  seconds: 0,
  running: false,
};
let timerInterval = null;

// Function to decrement the timer
const decrementTimer = () => {
  if (timer.seconds === 0) {
    if (timer.minutes === 0) {
      clearInterval(timerInterval);
      timer.running = false;
      io.emit("timer-update", timer);
      return;
    }
    timer.minutes--;
    timer.seconds = 59;
  } else {
    timer.seconds--;
  }
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
