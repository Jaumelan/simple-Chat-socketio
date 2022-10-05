const express = require("express");
const socketio = require("socket.io");
const app = express();

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(9000, () =>
  console.log("Listening on port 9000")
);

const io = socketio(expressServer, {
  cors: {
    origin: "*",
  },
  path: "/socket.io",
  serveClient: true,
});

io.on("connection", (socket) => {
  socket.on("messageToServer", (dataFromClient) => {
    console.log(dataFromClient);
  });
  socket.on("newMessageToServer", (msg) => {
    //send this message to everyone
    io.emit("messageToClients", { text: msg.text });
  });

  socket.emit("messageFromServer", { data: "Welcome to the socketio server" });
});
