const { application } = require("express");
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

server.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
