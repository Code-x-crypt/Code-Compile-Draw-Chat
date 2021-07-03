const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const cors = require("cors");
const logger = require("./utils/logger.js");

app.use(cors());

io.on("connection", (socket) => {
  let roomId = 0;
  let userName = "";

  //joining in a room
  socket.on("joinroom", function (data) {
    roomId = data.room;
    logger.info("Room id is: " + roomId);
    userName = data.name;
    logger.info("User Name is: " + userName);
    socket.join(roomId);
    socket.to(roomId).emit("userjoined", userName);
    logger.info(
      "User: " + userName + " joined Room: " + roomId + " successfully"
    );
  });

  socket.on("message", (message) => {
    socket.to(roomId).emit("message", message);
    logger.info("Message to roomId: " + roomId + " is: " + message);
  });

  socket.on("chatmessage", (data) => {
    socket.to(roomId).emit("chatmessage", data);
    logger.info("ChatMessage to roomId: " + roomId + " is:" + data);
  });

  socket.on("disconnect", function () {
    socket.to(roomId).emit("userleft", userName);
    logger.info(userName + " left the room");
  });
});
app.get("/", (req, res) => {
  res.send({ response: "Server is up and running." }).status(200);
  logger.info("Server is up and running");
});
server.listen(process.env.PORT || 4000, function () {
  console.log("server is working");
  logger.info("Server is working");
});
