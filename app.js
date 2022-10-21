const express = require("express");
const app = express();
const path = require("path");
const router = require("./router");
const server = require("http").createServer(app);
let io = require("socket.io")(server);
require("dotenv").config();
const port = process.env.PORT || 5000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

app.use("/", router);

io.on("connect", (socket) => {
  console.log(`${socket.id} has been connected to Server`);

  socket.on("mouseMove", ({ x, y }) => {
    socket.broadcast.emit("onMouseMove", { x, y });
  });

  socket.on("mouseUp", ({ x, y }) => {
    socket.broadcast.emit("onMouseUp", { x, y });
  });

  socket.on("mouseDown", ({ x, y }) => {
    socket.broadcast.emit("onMouseDown", { x, y });
  });

  socket.on("disconnect", (_reason) => {
    console.log(`${socket.id} is disconnected`);
  });
});

server.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
