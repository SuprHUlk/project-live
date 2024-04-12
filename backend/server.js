const app = require("./app");
const debug = require("debug")("node-angular");
const http = require("http");
const socketIo = require("socket.io");

const normalizePort = (val) => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const onError = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "*", // Allow requests from any origin
    methods: ["GET", "POST"], // Allow GET and POST requests
    credentials: true, // Allow sending cookies
  },
});

const Message = require("./models/messageModel");

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("join room", async (roomID) => {
    socket.join(roomID);
    console.log(`User joined room ${roomID}`);
    try {
      // Fetch last 50 messages from MongoDB and emit to the user
      const messages = await Message.find({ roomId: roomID })
        .sort({ timestamp: -1 })
        .limit(50);
      socket.emit("load messages", messages);
    } catch (err) {
      // Handle any errors
      console.error(err);
    }
  });

  socket.on("chat message", async (data) => {
    const { roomId, msg } = data;
    try {
      // Save the message to MongoDB
      const message = new Message({
        roomId: roomId,
        text: msg,
        timeStamp: new Date(),
      });
      const result = await message.save();
      io.to(roomId).emit("chat message", result);
    } catch (err) {
      console.error(err);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.on("error", onError);
server.on("listening", onListening);
server.listen(port);
