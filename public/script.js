const canvas = document.getElementById("whiteboard");
const socket = io();

canvas.width = 0.98 * window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");
let x;
let y;
let isDrawing = false;

window.onmousedown = (_e) => {
  socket.emit("mouseDown", { x, y });
  ctx.moveTo(x, y);
  isDrawing = true;
};

window.onmouseup = (_e) => {
  socket.emit("mouseUp", { x, y });
  isDrawing = false;
};

window.onmousemove = (e) => {
  x = e.clientX;
  y = e.clientY;
  if (isDrawing) {
    socket.emit("mouseMove", { x, y });
    ctx.lineTo(x, y);
    ctx.stroke();
  }
};

socket.on("onMouseMove", ({ x, y }) => {
  ctx.lineTo(x, y);
  ctx.stroke();
});

socket.on("onMouseDown", ({ x, y }) => {
  ctx.moveTo(x, y);
});
