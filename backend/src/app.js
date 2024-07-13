const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server);

// Middleware
app.use(express.json());

// Routes
app.use("/api", require("./routes"));

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("code-change", (data) => {
    socket.broadcast.emit("code-update", data);
    console.log(data);
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });
});

module.exports = { app, server };
