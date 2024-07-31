const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { exec } = require("child_process");
const { stderr } = require("process");
const vm = require("vm");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", require("./routes"));

// code compilation endpoint
app.post("/compile", (req, res) => {
  const { code } = req.body;
  console.log("Received code:", code);

  try {
    let output = "";
    const script = new vm.Script(`
      (function() {
        const console = {
          log: (...args) => {
            output += args.join(' ') + '\\n';
          }
        };
        ${code}
      })()
    `);
    const context = { output: "" };
    vm.createContext(context);
    script.runInContext(context);
    console.log("Execution result:", context.output);
    res.json({ output: context.output });
  } catch (error) {
    console.error("Execution error:", error);
    res.status(400).json({ error: error.message });
  }
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });

  socket.on("message", (msg) => {
    io.emit("message", msg);
  });

  socket.on("code-change", (data) => {
    socket.broadcast.emit("code-update", data);
  });
});

module.exports = { app, server };
