const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "https://copo-skyash.vercel.app/", // Allow your client origin
    methods: ["GET", "POST"],
    credentials: true, // Include if you are using cookies or authentication
  },
});

app.use(cors());
app.use("/.netlify/functions/server", router);

io.on("connect", (socket) => {
  socket.on("chat-message", (object) => {
    io.emit("chat-message", object);
  });
});

server.listen(process.env.PORT || 5000, () =>
  console.log(`Server has started.`)
);
