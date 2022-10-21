const canvas = document.getElementById("whiteboard");
const socket = io();

canvas.width = 0.98 * window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");
let x;
let y;
let isDrawing = false;
window.onmousedown = (_e) => {
  ctx.moveTo(x, y);
  isDrawing = true;
};

window.onmouseup = (_e) => {
  isDrawing = false;
};

window.onmousemove = (e) => {
  x = e.clientX;
  y = e.clientY;
  if (isDrawing) {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
};
